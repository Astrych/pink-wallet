
import axios from "axios";

import { apiCall, GithubData } from "./common";
import { githubBaseURL } from "./config";


const instance = axios.create({
    baseURL: githubBaseURL,
    method: "GET",
    headers: {
        "accept": "application/vnd.github.v3+json"
    },
});

export async function getLatestRelease(repoURL) {

    const reqData = {

        url: `/repos/${repoURL}/releases/latest`,
    };
    return <GithubData>(await apiCall(instance, reqData));
}

export async function downloadDaemon(path: string) {

}
