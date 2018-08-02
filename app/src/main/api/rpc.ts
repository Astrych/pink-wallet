
import axios from "axios";

import { apiCall } from "./common";
import { daemonBaseURL } from "./config";
import { Auth } from "../daemon/config";
import {

    RPCData,
    Block,
    Peer,
    Transaction,
    WalletInfo,

} from "./rpc-data-types";


const instance = axios.create({
    baseURL: daemonBaseURL,
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
});

type Params = string | number| boolean | Array<string | number> | null;

/**
 * Fetches specific blockchain data.
 */
async function getBlockchainData(auth: Auth, method: string, params:Params=null) {

    const payload = {
        id: new Date().getTime(),
        method,
        params: params ? (params instanceof Array ? params : [params]) : [],
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
    return response.result;
}

/**
 * Stops the daemon and possibly override the detachdb config value.
 */
export async function stop(auth: Auth, detach?:boolean) {
    return await getBlockchainData(auth, "stop", detach ? detach : null) as string;
}

/**
 * Returns total number of blocks.
 */
export async function getBlockCount(auth: Auth) {
    return await getBlockchainData(auth, "getblockcount") as number;
}

/**
 * Returns hash for specified block.
 */
export async function getBlockHash(auth: Auth, blockNumber=1) {
    return await getBlockchainData(auth, "getblockhash", blockNumber) as string;
}

/**
 * Returns data for specified block.
 */
export async function getBlock(auth: Auth, blockHash: string) {
    return await getBlockchainData(auth, "getblock", blockHash) as Block;
}

/**
 * Returns the number of connections to other nodes.
 */
export async function getConnectionCount(auth: Auth) {
    return await getBlockchainData(auth, "getconnectioncount") as number;
}

/**
 * Returns info about connected peers.
 */
export async function getPeerInfo(auth: Auth) {
    return await getBlockchainData(auth, "getpeerinfo") as Peer[];
}

/**
 * Returns list of transactions.
 */
export async function getListOfTransactions(auth: Auth, { account="*", count=10, from=0 }={}) {
    return await getBlockchainData(auth, "listtransactions", [
        account, count, from
    ]) as Transaction[];
}

/**
 * Returns transaction data.
 */
export async function getTransaction(auth: Auth, txid: string) {
    return await getBlockchainData(auth, "gettransaction", txid) as Transaction;
}

/**
 * Returns wallet info.
 */
export async function getWalletInfo(auth: Auth) {
    return await getBlockchainData(auth, "getwalletinfo") as WalletInfo;
}
