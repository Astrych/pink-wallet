
import { app, ipcMain } from "electron";

import { splashWindow, createSplashWindow } from "./window/splash";
import { mainWindow, createMainWindow } from "./window/main";
import { tray, createTray } from "./window/tray";


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

const shouldQuit = makeSingleInstance();
if (shouldQuit) app.quit();

function makeSingleInstance() {
    if (process.mas) return false;

    return app.makeSingleInstance(() => {
        if (splashWindow || mainWindow) {
            if (splashWindow) {
                splashWindow.focus();

            } else {
                if (mainWindow && mainWindow.isMinimized()) {
                    mainWindow.restore();
                }
                mainWindow.focus();
            }
        }
    });
}

app.on("ready", () => {

    setTimeout(() => { // Transparency workaround.

        createSplashWindow();
        createMainWindow();
        createTray();

    }, 200);
});

app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        tray.destroy();
        app.quit();
    }
});

ipcMain.on("data-loaded", () => {

    splashWindow.destroy();
    mainWindow.show();

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {
        mainWindow.webContents.openDevTools({ mode : "detach" });
    }
});
