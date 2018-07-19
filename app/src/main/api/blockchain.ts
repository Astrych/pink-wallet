
import { apiCall } from "./utils";
import { daemonBaseURL } from "./config";
import { Auth } from "../daemon/config";

import { RPCData } from "./utils";


type Params = string | number | null;

/**
 * Fetches specific blockchain data.
 */
async function getBlockchainData(auth: Auth, method: string, params:Params=null) {

    const payload = {
        method,
        params: params ? [params] : [],
        jsonrpc: "2.0",
    };

    const reqData = {
        baseURL: daemonBaseURL,
        method: "POST",
        data: payload,
        auth
    };
    return <RPCData>(await apiCall(reqData));
}

/**
 * Get total number of blocks.
 */
export async function getBlockCount(auth: Auth) {
    return await getBlockchainData(auth, "getblockcount");
}

/**
 * Get hash for specified block.
 */
export async function getBlockHash(auth: Auth, blockNumber=1) {
    return await getBlockchainData(auth, "getblockhash", blockNumber);
}

/**
 * Get data for specified block.
 */
export async function getBlockData(auth: Auth, blockHash: string) {
    return await getBlockchainData(auth, "getblock", blockHash);
}

/**
 * Get the number of connections to other nodes.
 */
export async function getConnectionCount(auth: Auth) {
    return await getBlockchainData(auth, "getconnectioncount");
}

/**
 * Stops the daemon.
 */
export async function stop(auth: Auth) {
    return await getBlockchainData(auth, "stop");
}
