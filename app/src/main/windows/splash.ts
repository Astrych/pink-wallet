
import path from "path";
import { BrowserWindow, app } from "electron";

import { getCenterPosition } from "./utils";
import logger from "../logger";

import { wholeObject } from "@common/utils";


interface RunOnStart {
    (window: BrowserWindow | null): Promise<void>;
}

export let window: BrowserWindow | null;

export function createSplashWindow(runOnStart: RunOnStart) {

    window = new BrowserWindow({
        width: 810,
        height: 610,
        center: true,
        resizable: false,
        transparent: true,
        frame: false,
        show: false,
        skipTaskbar: true,
        icon: path.join(__dirname, "img/icon.png")
    });

    if (process.env.NODE_ENV !== "production") {
        window.loadURL(process.env.SPLASH_VIEW as string);
    } else {
        window.loadFile(process.env.SPLASH_VIEW as string);
    }

    window.on("closed", () => window = null);

    window.webContents.on("crashed", event => {
        logger.error("Splash window web content crashed!");
        logger.error("splashWindow:", event);
    });

    window.once("ready-to-show", () => {
        // Workaround for issue:
        // https://github.com/electron/electron/issues/3490
        if (process.platform === "linux") {
            const pos = getCenterPosition(window!);
            window!.setPosition(pos.x, pos.y);
        }

        window!.show();
        window!.webContents.openDevTools({ mode : "detach" });

        runOnStart(window)
        .catch(err => {
            logger.error(wholeObject(err));
            // TODO: Show notification with error message.
            // app.exit(1);
        });
    });

    return window;
}
