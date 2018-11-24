
import { join } from "path";
import { BrowserWindow } from "electron";
import Store from "electron-store";
import R from "ramda";
import debounce from "lodash.debounce";

import { getCenterPosition } from "./utils";
import logger from "../logger";


export const store = new Store();

export let window: BrowserWindow | null;

interface AppState {
    position: {
        x: number,
        y: number
    };
    size: {
        width: number,
        height: number
    };
    isMaximized: boolean;
    color: string;
    theme: string;
    language: string;
};

export const state: AppState = {
    position: {
        x: 0,
        y: 0
    },
    size: {
        width: 1257,
        height: 805,
    },
    isMaximized: false,
    color: "#3b3b3b",
    theme: "dark",
    language: "en",
};

export function createMainWindow() {

    // Gets window state.
    state.color = store.get("window.color", state.color);
    state.isMaximized = store.get("window.isMaximized", state.isMaximized);
    state.position = store.get("window.position", state.position);
    state.size = store.get("window.size", state.size);

    // Get app state.
    state.theme = store.get("app.theme", state.theme);
    state.language = store.get("app.language", state.language);

    // TODO: Sandbox mode with white-listed IPC calls:
    // https://github.com/lightninglabs/lightning-app/blob/master/public/preload.js

    /**
     * Workaround for bug with Frameless window and minWidth / minHeight on Linux.
     * minHeight > 526: window is not responding on drag to upper edge and win + up/down.
     * minWidth > 960: window is not responding on drag to left or right edge and win + left/right.
     * https://github.com/electron/electron/issues/13118
     */
    window = new BrowserWindow({
        width: state.size.width,
        height: state.size.height,
        minWidth: 960,
        minHeight: 526,
        show: false,
        frame: false,
        useContentSize: true,
        titleBarStyle: "hiddenInset",
        icon: join(__dirname, `icons/icon.${process.platform === "win32" ? "ico" : "png"}`),
    });

    window.setBackgroundColor(state.color);

    window.setMenu(null);

    window.on("closed", () => window = null);

    window.webContents.on("crashed", event => {
        logger.error("Main window web content crashed!");
        logger.error("mainWindow:", event);
    });

    window.once("ready-to-show", () => {
        if (R.isEmpty(state.position) && !state.isMaximized) {
            // Workaround for issue:
            // https://github.com/electron/electron/issues/3490
            if (process.platform === "linux") {
                state.position = getCenterPosition(window!);
                window!.setPosition(state.position.x, state.position.y);
            }

        } else {

            window!.setPosition(state.position.x, state.position.y);
        }
    });

    function updateBounds() {
        if (!window || state.isMaximized) return;

        const { x, y, width, height } = window.getBounds();
        state.position = { x, y };
        state.size = { width, height };
    }

    function updateState() {
        if (window) state.isMaximized = window.isMaximized();
    }

    window.on("maximize", updateState);
    window.on("unmaximize", () => {
        updateState();
        // Workaround: fix for issue with maximization and restoring
        // Title bar issue was resolved by Windows update but posstion issue not yet.
        // https://github.com/electron/electron/issues/12971
        if (process.platform === "win32") {
            setTimeout(() => {
                if (!window) return;
                const bounds = window.getBounds();
                bounds.width += 1;
                window.setBounds(bounds);
                bounds.width -= 1;
                window.setBounds(bounds);
            }, 2);
        }
    });
    window.on("resize", debounce(updateBounds, 100));
    window.on("move", debounce(updateBounds, 100));

    window.on("close", () => {
        updateState();

        const statesToSave = {
            "window.isMaximized": state.isMaximized,
            "window.position": state.position,
            "window.size": state.size,
            "window.color": state.color,
            "app.theme": state.theme,
            "app.language": state.language,
        };

        // Saves state to file.
        for (const [key, value] of Object.entries(statesToSave)) {
            store.set(key, value);
        }
    });

    if (process.env.NODE_ENV !== "production") {
        window.loadURL(process.env.MAIN_VIEW as string);

    } else {
        window.loadFile(process.env.MAIN_VIEW as string);
    }

    return window;
}
