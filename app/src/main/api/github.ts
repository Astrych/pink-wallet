
import fs from "fs";
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

/**
 * Downloads file and stream progress in percents.
 */
export async function* downloadRelease(url: string, path: string) {
    const response = await axios({
        method: "GET",
        url,
        responseType: "stream"
    });

    if (!response.data) throw new Error("Download stream is undefined!");
    if (!(Symbol.asyncIterator in response.data)) {
        throw new Error("Download stream is not an asynchronous iterable");
    }

    const newFile = fs.createWriteStream(path);

    const totalSize = response.headers["content-length"];
    let downloadedSize = 0;
    let progress = 0;

    for await (const chunk of response.data) {
        newFile.write(chunk);

        // Progress calculations.
        downloadedSize += chunk.length;
        const newProgress = Math.floor(100*downloadedSize/totalSize);
        if (newProgress > progress) {
            progress = newProgress;
            yield progress;
        }
    }

    newFile.close();
}
