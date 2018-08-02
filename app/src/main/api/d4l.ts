
import axios from "axios";

import { apiCall, D4LData } from "./common";
import { d4lBaseURL } from "./config";


const instance = axios.create({
    baseURL: d4lBaseURL,
    url: "/accounts/",
    method: "GET",
});

export async function getD4LData() {
    return <D4LData>(await apiCall(instance));
}
