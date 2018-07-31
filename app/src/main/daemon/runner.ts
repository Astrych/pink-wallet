
import util from "util";
import path from "path";
import { promises as fs } from "fs";
import { Readable } from "stream";
import { spawn, ChildProcess } from "child_process";
import { BrowserWindow } from "electron";
import EventEmitter from "events";

import { downloadDaemon } from "./downloader";
import {

    stop,
    getBlockCount,
    getBlockHash,
    getBlockData,
    getConnectionCount,

} from "../api/rpc";
import config, { initAuth } from "./config";
import { chunksToLines } from "./utils";
import logger from "../logger";
import { testnet } from "../params";
import { sleep, wholeObject } from "@common/utils";


// TODO: Check that daemon feature:
// https://bitcointalk.org/index.php?topic=448565.0

const emitter = new EventEmitter();

const startStages = [
    "Loading block index...",
    "Loading wallet...",
    "Loading addresses...",
    "Done loading",
    "ThreadRPCServer started"
];

const logErrors = [
    "ERROR: CDB() : error DB_RUNRECOVERY: Fatal error"
];

export let pink2d: ChildProcess | null = null;

export async function startDaemon(window: BrowserWindow | null) {

    logger.log("Starting wallet daemon...");

    logger.debug(`Daemon main directory: ${config.mainDir}`);
    logger.debug(`Daemon data directory: ${config.dataDir}`);

    const startTime = process.hrtime();

    // Checks for daemon main directory existance.
    await checkDir({
        path: config.mainDir,
        warnMessage: "Daemon main directory does not exist! Recreating it...",
        failMessage: "App main directory does not exist!"
    });

    // Checks for daemon binary existance.
    try { await fs.access(config.command); } catch {
        logger.warn("Daemon binary does not exist!");

        try { await downloadDaemon(window); } catch (err) {
            if (err.code === 404) {
                throw new Error("Daemon binary not available!");
            }
            throw err;
        }
    }

    // Checks binary executable permission for non-Windows
    // platforms and sets correct access rights if necessary.
    if (process.platform !== "win32") {
        const stat = await fs.stat(config.command);
        if (!((stat.mode >> 6) & 1)) {
            await fs.chmod(config.command, "700");
        }
    }

    // Checks blockchain data directory existance.
    await checkDir({
        path: config.dataDir,
        warnMessage: "Blockchain data directory does not exist! Recreating it...",
        failMessage: `Main daemon directory does not exist: ${config.mainDir}`
    });

    if (testnet) {
        // Checks testnet blockchain data directory existance.
        await checkDir({
            path: path.join(config.dataDir, "testnet"),
            warnMessage: "Daemon main directory does not exist! Recreating it...",
            failMessage: "App main directory does not exist!"
        });
    }

    // Generates random auth data.
    const auth = await initAuth();

    const spawnParams = [
        "-printtoconsole",
        `-datadir=${config.dataDir}`,
        `-rpcuser=${auth.username}`,
        `-rpcpassword=${auth.password}`,
        "-rpcallowip=127.0.0.1"
    ];
    if (testnet) spawnParams.unshift("-testnet");

    // Spawns daemon process.
    pink2d = spawn(config.command, spawnParams);

    pink2d.on("error", err => {
        logger.error("Daemon Process", wholeObject(err));
        if (process.platform !== "win32" && err.message.includes("EACCES")) {
            logger.error("Daemon binary is not executable or has wrong owner!");
        }
        if (err.message.includes("ENOENT")) {
            logger.error("Daemon binary probably does not exist!");
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
    };

    // Handles daemon log stream.
    try { await handleLogStream(params); } catch (err) {

        let message = err.message;

        if (err.message === "Parameter is undefined!") {
            message = "Daemon has not started!";
        }

        if (window && !window.isDestroyed()) {
            window.webContents.send("daemon-error", message);
        }

        emitter.emit("daemon-stopped");

        throw new Error(message);
    }
}

interface CheckDirparams {
    path: string;
    warnMessage: string;
    failMessage: string;
}

/**
 * Checks directory existance and recreates it if necessary.
 */
async function checkDir({ path, warnMessage, failMessage }: CheckDirparams) {

    try { await fs.access(path); } catch {
        logger.warn(warnMessage);

        try { await fs.mkdir(path); } catch (err) {
            if (err.message.includes("ENOENT")) {
                throw new Error(failMessage);
            }
            throw err;
        }
    }
}

interface LogHandlerParams {
    stdout: Readable;
    window: BrowserWindow | null;
    progressStep: number;
    startTime: [number, number];
}

/**
 * Handles daemon log stream:
 * - parses it
 * - interprates it
 * - sends messages to the window handler
 * - saves it to log file
 */
async function handleLogStream({
    stdout,
    window,
    progressStep,
    startTime,
}: LogHandlerParams) {

    const logFilePath = path.join(config.dataDir, testnet ? "testnet/daemon.log" : "daemon.log");
    const logFile = await fs.open(logFilePath, "a");

    // Is daemon started successfully?
    let hasStarted = false;

    for await (const line of chunksToLines(stdout)) {

        logFile.appendFile(line);

        for (const error of logErrors) {
            if (line.includes(error)) {
                throw new Error(`Fatal error! Check ${logFilePath}.`);
            }
        }

        // Skips checking start progress (daemon is already running).
        if (hasStarted) continue;

        for (const stage of startStages) {
            if (line.includes(stage)) {

                // Is stage the last entry on the startStages list?
                if (startStages.indexOf(stage) === startStages.length - 1) {
                    const totalTime = process.hrtime(startTime);
                    logger.log(
                        `Daemon started in ${totalTime[0]}s and ${totalTime[1]/1e6}ms.`
                    );
                }

                // Sends progress info to window handler.
                if (window && !window.isDestroyed()) {
                    window.webContents.send("daemon-start-progress", {
                        step: progressStep,
                        total: startStages.length
                    });
                }

                progressStep += 1;
                if (progressStep === startStages.length) {
                    emitter.emit("daemon-started");
                    hasStarted =true;
                }

                break;
            }
        }
    }

    logFile.close();

    emitter.emit("daemon-stopped");
}

export function onDaemonStarted(cb) {
    emitter.on("daemon-started", cb);
}

export function onDaemonStopped(cb) {
    emitter.on("daemon-stopped", cb);
}

onDaemonStarted(async () => {
    try {

        const countData = await getBlockCount(config.auth);
        console.log("Number of blocks:");
        console.log(util.inspect(countData, {showHidden: false, depth: null}));

        await sleep(15000);

        const hashData = await getBlockHash(config.auth, 2);
        console.log("Block 2 hash:");
        console.log(util.inspect(hashData, {showHidden: false, depth: null}));

        const blockData = await getBlockData(config.auth, hashData.result as string);
        console.log(`Block ${hashData.result} data:`);
        console.log(util.inspect(blockData, {showHidden: false, depth: null}));

        const connectionCountData = await getConnectionCount(config.auth);
        console.log("Connection count:");
        console.log(util.inspect(connectionCountData, {showHidden: false, depth: null}));

        // await sleep(10000);

        // const stopData = await stop(config.auth);
        // console.log(stopData);

        // await sleep(10000);

        // const countData2 = await getBlockCount(config.auth);
        // console.log("Number of blocks 2:");
        // console.log(util.inspect(countData2, {showHidden: false, depth: null}));

    } catch (err) {
        console.error(err);
    }
});

onDaemonStopped(() => {
    logger.warn("DAEMON HAS STOPPED!");
});
