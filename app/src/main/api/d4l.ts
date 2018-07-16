
import { apiCall } from "./utils";
import { d4lBaseURL } from "./config";


export async function getD4LData() {

    const reqData = {

        baseURL: d4lBaseURL,
        url: `/accounts/`,
        method: "GET"
    };
    return await apiCall(reqData);
}
