

export interface RPCData {
    result: string | number | Block | Peer[] |
            Transaction[] | Transaction | WalletInfo | null;
    error;
    id;
}

export interface Block {
    hash: string;
    confirmations: number;
    size: number;
    height: number;
    version: number;
    merkleroot: string;
    mint: number;
    time: number;
    nonce: number;
    bits: string;
    difficulty: number;
    blocktrust: string;
    chaintrust: string;
    previousblockhash?: string;
    nextblockhash?: string;
    flags: string;
    proofhash: string;
    entropybit: number;
    modifier: string;
    tx: string[];
    signature?: string;
}

export interface Peer {
    addr: string;
    services: string;
    lastsend: number;
    lastrecv: number;
    conntime: number;
    version: number;
    subver: string;
    inbound: boolean;
    releasetime: number;
    startingheight: number;
    banscore: number;
}

// TODO: Check it!
export interface Transaction {
    txid: string;
    vout?: string;
    account: string;
    address: string;
    category: string;
    amount: number;
    confirmations: number;
    blockhash: string;
    blockindex: number;
    blocktime: number;
    time: number;
    timereceived: number;
}

export interface WalletInfo {
    walletversion: number;
    balance: number;
    txcount: number;
    keypoololdest: number;
    keypoolsize: number;
    unlocked_until?: number;
}
