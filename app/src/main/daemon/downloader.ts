
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
import {

    calcChecksum,
    unzip,
    untar,
    isBussy

} from "./utils";


const platformMapper = {
    "win32": "Win",
    "linux": "Linux",
    "darwin": "OSX",
};

const platform = platformMapper[process.platform];


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

    // Is daemon binary ready to use?
    let isReady = false;

    // Iterates over list of release assets (for different platforms).
    for (const asset of releaseData.assets) {
        if (asset.name.includes(platform)) {
            const checksum = getChecksum(releaseData.body, asset.name);
            if (checksum) {

                const donwloadURL = asset.browser_download_url;
                const relasePath = join(config.mainDir, asset.name);

                // Downloads packaged daemon file and reports progress to window handler.
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

                    if (process.platform === "win32") {
                        await unzip(relasePath, config.command);

                    } else {
                        await untar(relasePath, config.mainDir);
                    }

                    await isBussy(config.command);

                    isReady = true;

                } else {
                    throw new Error(`Checksum mismatch! checksum: ${checksum}, hash: ${hash}`);
                }
            } else {
                throw new Error("Lack of checksum in description! Daemon will not be downloaded!");
            }

            break;
        }
    }

    if (isReady) logger.debug("Daemon binary is ready!");
    else throw new Error(`No matching file to download for ${platform} platform!`);
};


/**
 * Extracts checksum value from release description for specified file.
 */
function getChecksum(data: string, name: string) {

    const filter = new RegExp(`.*${name}`);
    const match = data.match(filter);
    let checksum: string | null = null;
    if (match) checksum = match[0].trim().split(" ")[0];

    return checksum;
}
