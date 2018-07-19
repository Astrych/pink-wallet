
import { apiCall } from "./utils";
import { d4lBaseURL } from "./config";

import { D4LData } from "./utils";


export async function getD4LData() {

    const reqData = {

        baseURL: d4lBaseURL,
        url: `/accounts/`,
        method: "GET"
    };
    return <D4LData>(await apiCall(reqData));
}
