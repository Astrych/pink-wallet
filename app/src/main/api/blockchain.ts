
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
    const resData = await apiCall(reqData);

    console.log("=======================================");
    console.log(resData);
    console.log("=======================================");

    // if (resData.status === 200) {
    //     return resData.data;
    // } else {
    //     throw { message: "Error!", code: resData.status };
    // }
}


/**
 * Fetches total number of blocks.
 */
export async function getBlockCount() {

    return await getBlockchainData("getblockcount");
}
