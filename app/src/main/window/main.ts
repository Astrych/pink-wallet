
import { BrowserWindow, screen } from "electron";


export let mainWindow: BrowserWindow | null;

export function createMainWindow() {
  /**
   * Bug with Frameless window and minWidth / minHeight on Linux.
   * minHeight > 526: window is not responding on drag to upper edge and win + up/down.
   * minWidth > 960: window is not responding on drag to lefto or right edge and win + left/right.
   * https://github.com/electron/electron/issues/13118
   */
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 960,
        minHeight: 526,
        show: false,
        frame: false,
        backgroundColor: "#eb78ab",
        titleBarStyle: "hiddenInset",
        icon: `${__dirname}/img/icon-256x256.png`,
    });

    mainWindow.setMenu(null);
    mainWindow.on("closed", () => mainWindow = null);

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
