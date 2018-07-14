
import path from "path";
import { spawn, ChildProcess } from "child_process";


const rpcuser = "pinkcoinrpc";
const rpcpassword = "H7BZ9mLPBBoYo1gDjec1zsy5bTQQg458M9DA4Q7estnT";

let pink2d: ChildProcess;

export function startDaemon() {

    const command = path.join(__dirname, "..", "daemon", "pink2d.exe");
    const dataDir = path.join(__dirname, "..", "daemon", "data");

    // TODO: Data folder must exist or process will exit!!

    pink2d = spawn(command, [
        "-testnet",
        "-daemon",
        "-printtoconsole",
        `-datadir=${dataDir}`,
        `-rpcuser=${rpcuser}`,
        `-rpcpassword=${rpcpassword}`
    ]);

    pink2d.on("error", err => {
        console.log("ERROR: DETAILS:", err);
    });

    pink2d.on("exit", (code, signal) => {
        console.log(`Child process exited with code ${code} and signal ${signal}`);
    });

    // pink2d.stdout.on("data", data => {
    //     const res = data.toString();
    //     console.log(res);
    // });

    // pink2d.stdout.on("readable", () => {
    //     let chunk;
    //     const loadRegex = /\d+/;
    //     while (null !== (chunk = pink2d.stdout.read())) {
    //         const chunkString = chunk.toString();
    //         if (chunkString.includes("Loading block index")) {
    //             const [ loadingProgress ] = chunkString.match(loadRegex);
    //             console.log(`Loading progress: ${loadingProgress}%`);
    //         }
    //     }
    // });
}
