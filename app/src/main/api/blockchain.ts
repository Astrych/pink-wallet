
import { apiCall } from "./utils";
import { daemonBaseURL } from "./config";


/**
 * Fetches specific blockchain data.
 */
async function getBlockchainData(method: string, params=null) {

    const payload = {
        method,
        params: params ? params : [],
        jsonrpc: "2.0",
    };

    const reqData = {

        baseURL: daemonBaseURL,
        method: "POST",
        data: payload,
    };
    return await apiCall(reqData);
}


/**
 * Fetches total number of blocks.
 */
export async function getBlockCount() {

    return await getBlockchainData("getblockcount");
}
