
import { AxiosInstance, AxiosRequestConfig } from "axios";

import { RPCData } from "./rpc-data-types";
import logger from "../logger";


export interface GithubData {
    tag_name: string;
    name: string;
    body: string;
    assets: Array<any>;
}

export interface D4LData {
    success: string;
    accounts: Array<any>;
}

type Data = D4LData | GithubData | RPCData | undefined;


export async function apiCall(
    instance: AxiosInstance,
    reqData: AxiosRequestConfig={}

): Promise<Data> {

    try {
        const resData = await instance.request(reqData);
        return resData.data;

    } catch (err) {
        if (err.response) {
            throw {
                code: err.response.status,
                message: err.response.statusText,
                data: err.response.data,
                request: {
                    headers: err.response.config.headers,
                    data: err.response.config.data
                }
            }

        } else {
            logger.error("apiCall():", err.code, err.message);

            let code = 1;
            let message = "Unknown connection error!";

            if (err.message.includes("ECONNREFUSED")) {
                code = 110;
                message = "Wrong URL specified or server is not running!";

            } else if (err.message.includes("ECONNRESET")) {
                code = 111;
                message = "Connection with daemon was abruptly closed!";
            }

            logger.error(message);
            throw { code, message };
        }
    }
}
