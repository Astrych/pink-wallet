
// TODO: Chenge it when this is shipped:
// https://github.com/Microsoft/TypeScript/pull/24959
// Add to ts.config:
// "resolveJsonModule": true
// "package.json": [
//    "app/package.json"
// ],
import settings from "package.json";
import { getLatestRelease } from "../api/github";
import logger from "../logger";


let platform: string | null = null;

if (process.platform === "win32") platform = "Win64";
else if (process.platform === "linux") platform = "Linux";
else if (process.platform === "darwin") platform = "OSX";


export async function downloadDaemon() {

    logger.info("Downloading daemon wallet...");

    const repoData = settings["daemon-repository"];
    const repoURL = `${repoData.user}/${repoData.name}`;

    const releaseData = await getLatestRelease(repoURL);

    // TODO: Add checksum for files in body
    // Parse it and compare with downloaded file.
    // Or use something like that:
    // https://github.com/bitcoin-core/gitian.sigs
    // https://github.com/particl/gitian.sigs
    // https://github.com/bitcoin-core/docs/blob/master/gitian-building.md
    // Code using it:
    // https://github.com/particl/particl-desktop/blob/90bca83777985e8d48043a4eb6bff54ed490a1bb/modules/clientBinaries/generateVersions.js

    console.log("--------------------------------------");
    console.log(releaseData.tag_name);
    console.log(releaseData.name);
    console.log(releaseData.body);
    console.log("--------------------------------------");

    for (const asset of releaseData.assets) {
        if (asset.name.includes(platform)) {
            const donwloadURL = asset.browser_download_url;
            // TODO: Download and extract daemon binary.
        }
    }

    // TODO: Return object with data:
    // tagName, name, body, version.

    logger.info("Daemon wallet downloaded.");
};
