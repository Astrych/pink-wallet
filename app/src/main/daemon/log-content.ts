
import { testnet } from "../params";


export const startStages = [
    "Loading block index...",
    "Loading wallet...",
    "Loading addresses...",
    "Done loading",
    "ThreadRPCServer started"
];

export const logErrors = [
    "ERROR: CDB() : error DB_RUNRECOVERY: Fatal error",
    `Unable to bind to 0.0.0.0:${testnet ? 19134 : 9134} on this computer.`
];
