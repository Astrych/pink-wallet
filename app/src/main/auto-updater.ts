
import { autoUpdater } from "electron-updater";

import logger from "./logger";


// TODO: requires configuration of Github repo:
// https://www.electron.build/configuration/publish
// https://www.electron.build/auto-update/
// https://github.com/iffy/electron-updater-example/blob/master/main.js
// https://github.com/iffy/electron-updater-example
export function initAutoUpdater() {

    if (process.env.NODE_ENV !== "production") return;

    autoUpdater.logger = logger;
    autoUpdater.checkForUpdatesAndNotify();
}
