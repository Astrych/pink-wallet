
import axios from "axios";

import { apiCall, RPCData } from "./common";
import { daemonBaseURL } from "./config";
import { Auth } from "../daemon/config";


const instance = axios.create({
    baseURL: daemonBaseURL,
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
});

type Params = string | number | null;

/**
 * Fetches specific blockchain data.
 */
async function getBlockchainData(auth: Auth, method: string, params:Params=null) {

    const payload = {
        id: new Date().getTime(),
        method,
        params: params ? [params] : [],
        jsonrpc: "2.0",
    };

    const reqData = {
        data: payload,
        auth,
    };
    const response = <RPCData>(await apiCall(instance, reqData));

    if (response.id !== payload.id) {
        throw new Error("Possible Man-in-the-middle Attack!!");
    }
    return response;
}

/**
 * Stops the daemon.
 */
export async function stop(auth: Auth) {
    return await getBlockchainData(auth, "stop");
}

/**
 * Returns total number of blocks.
 */
export async function getBlockCount(auth: Auth) {
    return await getBlockchainData(auth, "getblockcount");
}

/**
 * Returns hash for specified block.
 */
export async function getBlockHash(auth: Auth, blockNumber=1) {
    return await getBlockchainData(auth, "getblockhash", blockNumber);
}

/**
 * Returns data for specified block.
 */
export async function getBlockData(auth: Auth, blockHash: string) {
    return await getBlockchainData(auth, "getblock", blockHash);
}

/**
 * Returns the number of connections to other nodes.
 */
export async function getConnectionCount(auth: Auth) {
    return await getBlockchainData(auth, "getconnectioncount");
}
