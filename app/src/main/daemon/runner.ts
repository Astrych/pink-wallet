
import util from "util";
import { promises as fs } from "fs";
import path from "path";
import { Readable } from "stream";
import { spawn, ChildProcess } from "child_process";
import { BrowserWindow } from "electron";
import EventEmitter from "events";

import {

    getBlockCount,
    getBlockHash,
    getBlockData,
    getConnectionCount,

} from "../api/blockchain";
import { chunksToLines, randomizeAuth, sleep } from "./utils";
import logger from "../logger";


// Interesting feature: https://bitcointalk.org/index.php?topic=448565.0

const emitter = new EventEmitter();

const startStages = [
    "Loading block index...",
    "Loading wallet...",
    "Loading addresses...",
    "Done loading",
    "ThreadRPCServer started"
];

export let pink2d: ChildProcess | null = null;

export async function startDaemon(window: BrowserWindow | null) {

    logger.log("Starting wallet daemon...");

    const startTime = process.hrtime();

    let binary = "pink2d";
    if (process.platform === "win32") binary += ".exe";
    const command = path.join(__dirname, "..", "daemon", binary);
    const dataDir = path.join(__dirname, "..", "daemon", "data");

    try { await fs.access(command); } catch {
        // TODO: Download daemon or exit??
        throw Error("Daemon binary does not exist!");
    }

    // Checks binary executable flag for non-Windows
    // platforms and sets access rights if necessary.
    if (process.platform !== "win32") {
        const stat = await fs.stat(command);
        if (!(stat.mode & 100)) await fs.chmod(command, "700");
    }

    try { await fs.access(dataDir); } catch {

        logger.warn("Daemon data directory does not exist! Recreating it...");

        try { await fs.mkdir(dataDir); } catch (err) {
            if (err.message.includes("ENOENT")) {
                const pathSep = process.platform !== "win32" ? "/" : "\\";
                const daemonDir = dataDir.substring(0, dataDir.lastIndexOf(pathSep));
                throw Error(`Main daemon directory does not exist: ${daemonDir}`);
            }
            throw err;
        }
    }

    // Generates random auth.
    const username = await randomizeAuth();
    const password = await randomizeAuth();

    pink2d = spawn(
        command,
        [
            "-testnet",
            "-printtoconsole",
            `-datadir=${dataDir}`,
            `-rpcuser=${username}`,
            `-rpcpassword=${password}`,
            "-rpcallowip=127.0.0.1"
        ],
    );

    pink2d.on("error", err => {
        logger.error("Daemon Process", err);
        if (process.platform !== "win32" && err.message.includes("EACCES")) {
            logger.error("Daemon binary probably is not executable!");
        }
        if (err.message.includes("ENOENT")) {
            logger.error("Daemon binary probably does not exist!");
            // TODO: Set some kind of flag for futher usage?
        }
    });

    pink2d.on("exit", (code, signal) => {
        logger.log(`Daemon process exited with code ${code} and signal ${signal}.`);
    });

    const params = {
        stdout: pink2d.stdout,
        window,
        progressStep: 0,
        startTime,
        auth: {
            username,
            password
        }
    };

    // Handles daemon log stream.
    try { await handleLogStream(params); } catch (err) {

        window && window.webContents.send("daemon-start-progress", {
            step: params.progressStep,
            total: startStages.length,
            error: true
        });

        if (err.message === "Parameter is undefined!") {
            throw new Error("Daemon has not started!");
        }
        throw err;
    }
}

interface HandlerParams {
    stdout: Readable;
    window: BrowserWindow | null;
    progressStep: number;
    startTime: [number, number];
    auth;
}

async function handleLogStream({ stdout, window, progressStep, startTime, auth }: HandlerParams ) {
    for await (const line of chunksToLines(stdout)) {

        // TODO: Parse error logs and send error in daemon-start-progress message.

        const stagePassed = startStages.some(stage => {

            const onTheList = line.includes(stage);
            if(onTheList) {

                // Is stage the last entry on the startStages list?
                if (startStages.indexOf(stage) === startStages.length - 1) {
                    const totalTime = process.hrtime(startTime);
                    logger.log(`Daemon started in ${totalTime[0]}s and ${totalTime[1]/1e6}ms.`);
                }
            }

            return onTheList;
        });

        if (stagePassed) {

            await sleep(1000);

            window && window.webContents.send("daemon-start-progress", {
                step: progressStep,
                total: startStages.length
            });

            progressStep += 1;

            if (progressStep === startStages.length) {
                // Not used right now.
                emitter.emit("daemon-started");

                try {
                    const countData = await getBlockCount(auth);
                    console.log("Number of blocks:");
                    console.log(util.inspect(countData, {showHidden: false, depth: null}));

                    const hashData = await getBlockHash(auth, 2);
                    console.log("Block 2 hash:");
                    console.log(util.inspect(hashData, {showHidden: false, depth: null}));

                    const blockData = await getBlockData(auth, hashData.result as string);
                    console.log(`Block ${hashData.result} data:`);
                    console.log(util.inspect(blockData, {showHidden: false, depth: null}));

                    const connectionCountData = await getConnectionCount(auth);
                    console.log("Connection count:");
                    console.log(util.inspect(connectionCountData, {showHidden: false, depth: null}));
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    // If we are here wallet daemon is not running...
    // TODO: How to handle this??
    // Check folders and binary existance and recreate if necessary?
    // Restart daemon?
    throw Error("Daemon is not running!");
}

// Not used right now.
export function onDaemonStarted(cb) {
    emitter.on("daemon-started", cb);
}
