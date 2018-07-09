
import { BrowserWindow, Rectangle } from "electron";
import Store from "electron-store";
import R from "ramda";

import { getCenterPosition } from "../utils";


const store = new Store();

export let mainWindow: BrowserWindow | null;

interface WindowState {
    position: {
        x?: number,
        y?: number
    };
    size: {
        width: number,
        height: number
    };
    isMaximized: boolean;
    color: string;
};

export const state: WindowState = {
    position: {},
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
   * Bug with Frameless window and minWidth / minHeight on Linux.
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
        titleBarStyle: "hiddenInset",
        icon: `${__dirname}/img/icon.${process.platform === "win32" ? "ico" : "png"}`,
    });

    mainWindow.setMenu(null);
    mainWindow.on("closed", () => mainWindow = null);

    mainWindow.once("ready-to-show", () => {
        if (R.isEmpty(state.position) && !state.isMaximized) {
            // Workaround for issue:
            // https://github.com/electron/electron/issues/3490
            if (process.platform === "linux") {
                state.position = getCenterPosition(mainWindow);
                mainWindow.setPosition(state.position.x, state.position.y);
            }

        } else {
            // Workaround for strage bounds in maximized state.
            if (state.position.x < 0) {
                state.position.x -= state.position.x;
                state.position.y -= state.position.y;
                state.size.width -= 2*state.position.x;
            }
            mainWindow.setPosition(state.position.x, state.position.y);
        }
    });

    function updateBounds() {
        if (!state.isMaximized) {
            const { x, y, width, height } = mainWindow.getBounds();
            state.position = { x, y };
            state.size = { width, height };
        }
    }
    function updateState() {
        state.isMaximized = mainWindow.isMaximized();
    }

    mainWindow.on("maximize", updateState);
    mainWindow.on("unmaximize", () => {
        updateState();
        // Workaround: partial fix for issue with maximization and restoring
        // https://github.com/electron/electron/issues/12971
        if (process.platform === "win32") {
            setTimeout(() => {
                const bounds = mainWindow.getBounds();
                bounds.width += 1;
                mainWindow.setBounds(bounds);
                bounds.width -= 1;
                mainWindow.setBounds(bounds);
            });
        }
    });
    mainWindow.on("resize", updateBounds);
    mainWindow.on("move", updateBounds);

    mainWindow.on("close", () => {
        updateState();
        store.set("window.position", state.position);
        store.set("window.size", state.size);
        store.set("window.isMaximized", state.isMaximized);
        store.set("window.color", state.color);
    });

    // Undocumented function allowing for dynamic color change.
    (mainWindow as any).setBackgroundColor(state.color);

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {
        mainWindow.loadURL(process.env.MAIN_VIEW);

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
        mainWindow.loadFile(process.env.MAIN_VIEW);
    }
}
