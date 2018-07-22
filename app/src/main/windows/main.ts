
import path from "path";
import { BrowserWindow, shell } from "electron";
import Store from "electron-store";
import R from "ramda";
import debounce from "lodash.debounce";

import { initAutoUpdater } from "../auto-updater";
import { getCenterPosition } from "../utils";


const store = new Store();

export let mainWindow: BrowserWindow | null;

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

    /**
     * Workaround for gug with Frameless window and minWidth / minHeight on Linux.
     * minHeight > 526: window is not responding on drag to upper edge and win + up/down.
     * minWidth > 960: window is not responding on drag to left or right edge and win + left/right.
     * https://github.com/electron/electron/issues/13118
     */
    mainWindow = new BrowserWindow({
        width: state.size.width,
        height: state.size.height,
        minWidth: 960,
        minHeight: 526,
        show: false,
        frame: false,
        useContentSize: true,
        titleBarStyle: "hiddenInset",
        icon: path.join(__dirname, `img/icon.${process.platform === "win32" ? "ico" : "png"}`),
    });

    mainWindow.setMenu(null);

    mainWindow.on("closed", () => mainWindow = null);

    // Handles external URLs.
    mainWindow.webContents.on("new-window", (event, url) => {
        event.preventDefault();
        if (url.match(/^https?:\/\//)) shell.openExternal(url);
    });

    mainWindow.once("ready-to-show", () => {
        initAutoUpdater();
        if (R.isEmpty(state.position) && !state.isMaximized) {
            // Workaround for issue:
            // https://github.com/electron/electron/issues/3490
            if (mainWindow && process.platform === "linux") {
                state.position = getCenterPosition(mainWindow);
                mainWindow.setPosition(state.position.x, state.position.y);
            }

        } else {
            // Workaround for strage bounds in maximized state.
            // Related to issue https://github.com/electron/electron/issues/12971
            if (process.platform === "win32" && state.position.x < 0) {
                state.position.x -= state.position.x;
                state.position.y -= state.position.y;
                state.size.width -= 2*state.position.x;
            }
            mainWindow && mainWindow.setPosition(state.position.x, state.position.y);
        }
    });

    function updateBounds() {
        if (!mainWindow || state.isMaximized) return;

        const { x, y, width, height } = mainWindow.getBounds();
        state.position = { x, y };
        state.size = { width, height };
    }

    function updateState() {
        if (mainWindow) state.isMaximized = mainWindow.isMaximized();
    }

    mainWindow.on("maximize", updateState);
    mainWindow.on("unmaximize", () => {
        updateState();
        // Workaround: partial fix for issue with maximization and restoring
        // https://github.com/electron/electron/issues/12971
        if (process.platform === "win32") {
            setTimeout(() => {
                if (!mainWindow) return;
                const bounds = mainWindow.getBounds();
                bounds.width += 1;
                mainWindow.setBounds(bounds);
                bounds.width -= 1;
                mainWindow.setBounds(bounds);
            }, 2);
        }
    });
    mainWindow.on("resize", debounce(updateBounds, 100));
    mainWindow.on("move", debounce(updateBounds, 100));

    mainWindow.on("close", () => {
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
    (mainWindow as any).setBackgroundColor(state.color);

    if (process.env.NODE_ENV !== "production") {
        mainWindow.loadURL(process.env.MAIN_VIEW as string);

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
        mainWindow.loadFile(process.env.MAIN_VIEW as string);
    }

    return mainWindow;
}
