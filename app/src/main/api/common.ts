
import { AxiosInstance, AxiosRequestConfig } from "axios";

import logger from "../logger";


export interface D4LData {
    success: string;
    accounts: Array<any>;
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

type Data = D4LData | RPCData | GithubData | undefined;


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

            } else {
                throw {  code: 1, message: "Unknown connection error!" };
            }

            logger.error(message);
            throw { code, message };
        }
    }
}
