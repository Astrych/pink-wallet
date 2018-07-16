
import path from "path";
import { spawn, ChildProcess } from "child_process";
import { BrowserWindow } from "electron";
import EventEmitter from "events";

import { getBlockCount } from "../api/blockchain";
import { chunksToLines, stripEndOfLine } from "./utils";
import logger from "../logger";


const emitter = new EventEmitter();

// Interesting feature: https://bitcointalk.org/index.php?topic=448565.0

const startStages = [
    "Loading block index...",
    "Loading wallet...",
    "Loading addresses...",
    "Done loading",
    "ThreadRPCServer started"
];

const rpcuser = "pinkcoinrpc";
const rpcpassword = "H7BZ9mLPBBoYo1gDjec1zsy5bTQQg458M9DA4Q7estnT";

export let pink2d: ChildProcess | null = null;

export async function startDaemon(window: BrowserWindow) {

    let binary = "pink2d";
    if (process.platform === "win32") binary += ".exe";
    const command = path.join(__dirname, "..", "daemon", binary);
    const dataDir = path.join(__dirname, "..", "daemon", "data");

    // TODO: Data folder must exist or process will exit!!

    const startTime = process.hrtime();

    pink2d = spawn(
        command,
        [
            "-testnet",
            "-printtoconsole",
            `-datadir=${dataDir}`,
            `-rpcuser=${rpcuser}`,
            `-rpcpassword=${rpcpassword}`,
            "-rpcallowip=127.0.0.1"
        ],
    );

    pink2d.on("error", err => {
        logger.error("Daemon process error:", err);
    });

    pink2d.on("exit", (code, signal) => {
        logger.log(`Daemon process exited with code ${code} and signal ${signal}.`);
    });

    let progressStep = 0;

    for await (const line of chunksToLines(pink2d.stdout)) {

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

            window.webContents.send("daemon-start-progress", {
                step: progressStep,
                total: startStages.length
            });

            progressStep += 1;

            // Not used right now.
            if (progressStep === startStages.length) {
                emitter.emit("daemon-started");

                try {
                    const resData = await getBlockCount();
                    console.log("=======================GET DATA=======================");
                    console.log(`Response status: ${resData.status}`);
                    console.log(`Response message: ${resData.statusText}`);
                    console.log(`Number of blocks ${resData.data}`);
                } catch (err) {
                    console.log("=======================THROW END=======================");
                    console.error(err);
                }
            }
        }
    }
}

// Not used right now.
export function onDaemonStarted(cb) {
    emitter.on("daemon-started", cb);
}
