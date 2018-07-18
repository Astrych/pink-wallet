
import axios from "axios";

import logger from "../logger";


axios.defaults.headers.post["content-type"] = "application/json";

interface Data {
    result: string | number | object | null;
    error;
    id;
}

export async function apiCall(reqData): Promise<Data> {

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
