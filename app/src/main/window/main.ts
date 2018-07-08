
import { BrowserWindow } from "electron";
import Store from "electron-store";

import { getCenterPos } from "../utils";


const store = new Store();

export let mainWindow: BrowserWindow | null;

export function createMainWindow() {
  /**
   * Bug with Frameless window and minWidth / minHeight on Linux.
   * minHeight > 526: window is not responding on drag to upper edge and win + up/down.
   * minWidth > 960: window is not responding on drag to left or right edge and win + left/right.
   * https://github.com/electron/electron/issues/13118
   */

    const color = store.get("window.color", "#3b3b3b");
    let { x, y } = store.get("window.position", {});
    const { width, height } = store.get("window.size", {
        width: 1257,
        height: 805
    });

    if (!x && !y) [ x, y ] = getCenterPos(width, height);

    mainWindow = new BrowserWindow({
        x,
        y,
        width,
        height,
        minWidth: 960,
        minHeight: 526,
        show: false,
        frame: false,
        titleBarStyle: "hiddenInset",
        icon: `${__dirname}/img/icon.${process.platform === "win32" ? "ico" : "png"}`,
    });

    mainWindow.setMenu(null);
    mainWindow.on("closed", () => mainWindow = null);

    // Undocumented function allowing for dynamic color change.
    (mainWindow as any).setBackgroundColor(color);

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
