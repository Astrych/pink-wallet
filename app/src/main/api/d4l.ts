
import { apiCall } from "./utils";


const d4lUrl = "https://donate.with.pink/api";


export async function getD4LData() {

    const reqData = {

        url: `${d4lUrl}/accounts/`,
        method: "GET"
    };
    const resData = await apiCall(reqData);

    if (resData.status === 200) {
        return resData.data;
    } else {
        throw { message: "Error!", code: resData.status };
    }
}
