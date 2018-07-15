
import { apiCall } from "./utils";
import { d4lBaseURL } from "./config";


export async function getD4LData() {

    const reqData = {

        baseURL: d4lBaseURL,
        url: `/accounts/`,
        method: "GET"
    };
    const resData = await apiCall(reqData);

    if (resData.status === 200) {
        return resData.data;
    } else {
        throw { message: "Error!", code: resData.status };
    }
}
