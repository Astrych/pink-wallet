
import { join } from "path";
import { BrowserWindow, shell } from "electron";
import Store from "electron-store";
import R from "ramda";
import debounce from "lodash.debounce";

import { getCenterPosition } from "./utils";
import logger from "../logger";


const store = new Store();

export let window: BrowserWindow | null;

interface WindowState {
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
};

export const state: WindowState = {
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
};

export function createMainWindow() {

    // Gets window state.
    state.color = store.get("window.color", state.color);
    state.isMaximized = store.get("window.isMaximized", state.isMaximized);
    state.position = store.get("window.position", state.position);
    state.size = store.get("window.size", state.size);


    // TODO: Sandbox mode with white-listed IPC calls:
    // https://github.com/lightninglabs/lightning-app/blob/master/public/preload.js

    /**
     * Workaround for gug with Frameless window and minWidth / minHeight on Linux.
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
        icon: join(__dirname, `img/icon.${process.platform === "win32" ? "ico" : "png"}`),
    });

    window.setMenu(null);

    window.on("closed", () => window = null);

    // Handles external URLs.
    window.webContents.on("new-window", (event, url) => {
        event.preventDefault();
        if (url.match(/^https?:\/\//)) shell.openExternal(url);
    });

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
            "window.color": state.color
        };

        // Saves state to file.
        for (const [key, value] of Object.entries(statesToSave)) {
            store.set(key, value);
        }
    });

    // Undocumented function allowing for dynamic color change.
    (window as any).setBackgroundColor(state.color);

    if (process.env.NODE_ENV !== "production") {
        window.loadURL(process.env.MAIN_VIEW as string);

        import("electron-devtools-installer")
        .then(module => {

            const extensions = [
                "REACT_DEVELOPER_TOOLS",
                "REDUX_DEVTOOLS",
            ];

            // Downloads and/or installs devtools extensions.
            extensions.map(name => {
                module.default(module[name], !!process.env.UPGRADE_EXTENSIONS)
                .then(name => console.log(`Added Extension: ${name}`))
                .catch(err => console.error("An error occurred:", err));
            });
        })
        .catch(err => {
            console.error("Failed to load electron-devtools-installer", err);
        });

    } else {
        window.loadFile(process.env.MAIN_VIEW as string);
    }

    return window;
}
