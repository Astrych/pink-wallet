
import { apiCall } from "./api-utils";


const d4lUrl = "https://donate.with.pink/api";


export async function getD4LData() {

    const data = {

        url: `${d4lUrl}/accounts/`,
        method: "GET",
    };
    return await apiCall(data);
}
