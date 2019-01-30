
import path from "path";
import { BrowserWindow } from "electron";

import logger from "../logger";

import { wholeObject } from "@common/utils";


interface RunOnStart {
    (window: BrowserWindow | null): Promise<void>;
}

export let window: BrowserWindow | null;

export async function createSplashWindow(runOnStart: RunOnStart) {

    window = new BrowserWindow({
        width: 615,
        height: 656,
        center: true,
        resizable: false,
        transparent: true,
        frame: false,
        show: false,
        skipTaskbar: true,
        icon: path.join(__dirname, "icons/icon.png"),
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
        },
    });

    if (process.env.NODE_ENV !== "production") {
        await window.loadURL(process.env.SPLASH_VIEW as string);
    } else {
        await window.loadFile(process.env.SPLASH_VIEW as string);
    }

    window.on("closed", () => window = null);

    window.webContents.on("crashed", event => {
        logger.error("Splash window web content crashed!");
        logger.error("splashWindow:", event);
    });

    window.once("ready-to-show", () => {
        window!.show();

        runOnStart(window)
        .catch(err => {
            logger.error(wholeObject(err));
            // TODO: Show notification with error message.
            // app.exit(1);
        });
    });

    return window;
}
