
// TODO: Chenge it when this is shipped:
// https://github.com/Microsoft/TypeScript/pull/24959
// Add to ts.config:
// "resolveJsonModule": true
// "package.json": [
//    "app/package.json"
// ],
import { join } from "path";
import { promises as fs } from "fs";
import { BrowserWindow } from "electron";

import settings from "package.json";
import {

    getLatestRelease,
    downloadRelease

} from "../api/github";
import logger from "../logger";
import config from "./config";
import { calcChecksum } from "./utils";


const platformMaper = {
    "win32": "Win64",
    "linux": "Linux",
    "darwin": "OSX"
};

const platform = platformMaper[process.platform];


export async function downloadDaemon(window: BrowserWindow | null) {

    logger.debug("Downloading daemon wallet...");

    const repoData = settings["daemon-repository"];
    const repoURL = `${repoData.user}/${repoData.name}`;

    const releaseData = await getLatestRelease(repoURL);

    // Release description.
    const description = {
        name: releaseData.name,
        version: releaseData.tag_name
    };

    for (const asset of releaseData.assets) {
        if (asset.name.includes(platform)) {
            const checksum = getChecksum(releaseData.body, asset.name);
            if (checksum) {

                const donwloadURL = asset.browser_download_url;
                const relasePath = join(config.mainDir, asset.name);

                for await (const progress of downloadRelease(donwloadURL, relasePath)) {
                    if (window && !window.isDestroyed()) {
                        window.webContents.send("daemon-download-progress", {
                            progress
                        });
                    }
                }

                logger.debug("Daemon wallet downloaded.");

                description["checksum"] = checksum;
                description["url"] = donwloadURL;

                const descriptionJSON = JSON.stringify(description);

                await fs.writeFile(
                    join(config.mainDir, "description.json"),
                    descriptionJSON
                );

                logger.debug("Comparing file hash and checksum...");

                const hash = await calcChecksum(relasePath);
                if (hash === checksum) {
                    logger.debug(`Unziping ${relasePath} to ${config.mainDir}`);
                    // TODO: Unzip / untar file.
                } else {
                    throw Error(`checksum mismatch ${checksum}`);
                }
            }
        }
    }

    logger.debug("Daemon binary is ready!");
};


function getChecksum(data: string, name: string) {

    const filter = new RegExp(`.*${name}`);
    const match = data.match(filter);
    let checksum: string | null = null;
    if (match) checksum = match[0].trim().split(" ")[0];

    return checksum;
}
