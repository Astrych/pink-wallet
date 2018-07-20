
import axios from "axios";

import { Auth } from "../daemon/config";
import logger from "../logger";


export interface D4LData {
    success?: string;
    accounts?: Array<any>;
}

export interface RPCData {
    result: string | number | object | null;
    error;
    id;
}

export interface GithubData {
    tag_name: string;
    name: string;
    body: string;
    assets: Array<any>;
}

type Data = D4LData | RPCData | GithubData;

interface Request {
    baseURL: string;
    url?: string;
    method: string;
    data?;
    auth?: Auth;
}

export async function apiCall(reqData: Request): Promise<Data> {

    try {
        const resData = await axios(reqData);

        if (resData.status === 200) {
            return resData.data;
        } else {
            throw {
                code: resData.status,
                message: resData.statusText
            };
        }

    } catch (err) {
        if (err.response) {
            throw {
                code: err.response.status,
                message: err.response.statusText
            };
        } else {
            logger.error(err);
            if (err.message.includes("ECONNREFUSED")) {
                const message = "Wrong URL specified or server is not running!";
                logger.error(message);
                throw {  code: 110, message };
            } else {
                throw {  code: 1, message: "Unknown connection error!" };
            }
        }
    }
}
