/**
 * @jest-environment node
 */

import util from "util";

import {

    stop,
    getBlockCount,
    getBlockHash,
    getBlock,
    getConnectionCount,
    getPeerInfo,
    getListOfTransactions,
    getWalletInfo,

} from "../api/rpc";


const auth = {
    username: "testauth",
    password: "testpass"
};


describe("Blockchain API", () => {
    it("should do something ;)", async () => {

        // try {

        //     const blocksCount = await getBlockCount(auth);
        //     console.log("Number of blocks:", blocksCount);

        //     const blockHash = await getBlockHash(auth, 10);
        //     console.log("Block 10 hash:", blockHash);

        //     const block = await getBlock(auth, blockHash);
        //     console.log(`Block ${blockHash} data:`);
        //     console.log(util.inspect(block, {showHidden: false, depth: null}));

        //     const connectionCount = await getConnectionCount(auth);
        //     console.log("Connection count:", connectionCount);

        //     const peers = await getPeerInfo(auth);
        //     console.log(`Peers:`);
        //     console.log(util.inspect(peers, {showHidden: false, depth: null}));

        //     const transactions = await getListOfTransactions(auth);
        //     console.log(`Transactions:`);
        //     console.log(util.inspect(transactions, {showHidden: false, depth: null}));

        //     const walletInfo = await getWalletInfo(auth);
        //     console.log(`Wallet info:`);
        //     console.log(util.inspect(walletInfo, {showHidden: false, depth: null}));

        //     const stopData = await stop(auth);
        //     console.log(stopData);

        // } catch (err) {
        //     console.error(err);
        // }
    });
});
