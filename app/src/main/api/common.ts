
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
