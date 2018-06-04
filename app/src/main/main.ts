
import {
    
    app,
    BrowserWindow,
    Tray,
    Menu,
    globalShortcut,
    ipcMain

} from "electron";

import { createSplashScreen } from "./splash-screen";


// Will be removed by Webpack in production.
if (process.env.NODE_ENV !== "production") {

    // Disables annoing warnings in development mode.
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

    import("electron-debug")
    .then(debug => {
        // Inits debug mode and devtron dev tools.
        debug.default({ showDevTools: false });
    })
    .catch(err => {
        console.error("Failed to load electron-debug", err);
    });
}

// Required on Linux platorm (bug workaround).
// Without it transparent window is black or white.
if (process.platform === "linux") {
    app.disableHardwareAcceleration();
}

let mainWindow: BrowserWindow | null;
let splashScreen: BrowserWindow | null;
let tray: Tray | null;

const shouldQuit = makeSingleInstance();
if (shouldQuit) app.quit();

function makeSingleInstance() {

    if (process.mas) return false;

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

// This is the new way of making single instance app.
// Old way will be deprecated in Electron 4.0.
// Waiting for newer version of Electorn (right now typings are broken).
/*
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

app.on("second-instance", (commandLine, workingDirectory) => {

    if (process.mas) return false;

    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});
*/

function createMainWindow() {

  /**
   * Error with Frameless window and minWidth / minHeight on Linux.
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
        icon: `${__dirname}/img/icon-256x256.png`
    });

    mainWindow.setMenu(null);

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {
        mainWindow.loadURL(process.env.MAIN_VIEW);

    } else {
        mainWindow.loadFile(process.env.MAIN_VIEW);
    }

    mainWindow.on("closed", () =>  mainWindow = null);

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {

        import("electron-devtools-installer")
        .then(module => {

            const extensions = [
                "REACT_DEVELOPER_TOOLS",
                "REDUX_DEVTOOLS"
            ];

            // Downloads and/or installs devtools extensions.
            extensions.map(name => {
                module.default(module[name], !!process.env.UPGRADE_EXTENSIONS)
                .then(name => console.log(`Added Extension:  ${name}`))
                .catch(err => console.error("An error occurred: ", err));
            });
        })
        .catch(err => {
            console.error("Failed to load electron-devtools-installer", err);
        });
    }
}

function createTray() {

    tray = new Tray(`${__dirname}/img/icon-256x256.png`);

    const contextMenu = Menu.buildFromTemplate([
        { label: process.env.APP_TITLE },
        { type: "separator" },
        {
            label: "Quit",
            click() {
                tray.destroy();
                app.quit();
            }
        }
    ]);

    tray.setToolTip(process.env.APP_TITLE);
    tray.setContextMenu(contextMenu);

    tray.on("double-click", event => {
        if (splashScreen && !splashScreen.isDestroyed()) {

            if (splashScreen.isVisible()) {
                splashScreen.hide();
        
            } else {
                splashScreen.show();
            }

        } else if (mainWindow && !mainWindow.isDestroyed()) {

            if (mainWindow.isVisible()) {
                mainWindow.hide();
        
            } else {
                mainWindow.show();
            }
        }
    });

    tray.on("click", event => {
        if (mainWindow && mainWindow.isVisible()) {
        // TODO: Show widget near tray icon.
        }
    });
}


app.on("ready", () => {

    setTimeout(() => { // Transparency workaround

        splashScreen = createSplashScreen();
        createMainWindow();
        createTray();
    
        const ret = globalShortcut.register("CmdOrCtrl+Q", () => {
            if (mainWindow.isFocused()) {
                console.log("Quiting...");
                tray.destroy();
                app.quit();
            }
        });
    
        if (!ret) {
            console.error("Shortcut registration failed");
        }

    }, 200);
});

app.on("activate", () => {
    if (mainWindow === null) createMainWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        tray.destroy();
        app.quit();
    }
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll()
});

ipcMain.on("data-loaded", () => {

    splashScreen.destroy();
    splashScreen = null;
    mainWindow.show();

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {
        mainWindow.webContents.openDevTools({ mode : "detach" });
    }
});
