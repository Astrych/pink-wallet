
import { Notification } from "electron";
import { autoUpdater } from "electron-updater";
import logger from "electron-log";


// TODO: requires configuration of Github repo:
// https://www.electron.build/configuration/publish
// https://github.com/iffy/electron-updater-example/blob/master/main.js
export function initAutoUpdater() {

    showUpdateInfo({});
    if (process.env.NODE_ENV !== "production") return;

    autoUpdater.logger = logger;
    autoUpdater.checkForUpdates();
    autoUpdater.on("update-downloaded", info => {
        showUpdateInfo(info);
        autoUpdater.quitAndInstall();
    });
    autoUpdater.on("download-progress", progress => {
        let msg = `Download speed: ${progress.bytesPerSecond}`;
        msg += ` - Downloaded ${progress.percent}%`;
        msg += ` (${progress.transferred}/${progress.total})`;
        logger.info(msg);
    });
}

function showUpdateInfo(info) {
    const versionInfo = info.label ? `Version ${info.version}` : "The latest version";

    // TODO: Send message to renderer proccess about update.
}
