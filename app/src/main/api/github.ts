

import { apiCall } from "./utils";
import { githubBaseURL } from "./config";

import { GithubData } from "./utils";


export async function getLatestRelease(repoURL) {

    const reqData = {

        baseURL: githubBaseURL,
        url: `/repos/${repoURL}/releases/latest`,
        method: "GET",
        headers: {
            "accept": "application/vnd.github.v3+json"
        }
    };
    return <GithubData>(await apiCall(reqData));
}

export async function downloadDaemon(path: string) {

}