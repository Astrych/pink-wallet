
import path from "path";
import { BrowserWindow } from "electron";

import { getCenterPosition } from "../utils";


interface RunOnStart {
    (window: BrowserWindow): Promise<void>;
}

export let splashWindow: BrowserWindow | null;

export function createSplashWindow(runOnStart: RunOnStart) {

    splashWindow = new BrowserWindow({
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
        splashWindow.loadURL(process.env.SPLASH_VIEW);

    } else {
        splashWindow.loadFile(process.env.SPLASH_VIEW);
    }

    splashWindow.on("closed", () => splashWindow = null);

    splashWindow.once("ready-to-show", () => {
        // Workaround for issue:
        // https://github.com/electron/electron/issues/3490
        if (process.platform === "linux") {
            const pos = getCenterPosition(splashWindow);
            splashWindow.setPosition(pos.x, pos.y);
        }

        splashWindow.show();
        // splashWindow.webContents.openDevTools({ mode : "detach" });

        runOnStart(splashWindow);
    });

    return splashWindow;
}
