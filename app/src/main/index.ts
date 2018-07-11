
import { app, ipcMain, session } from "electron";
import logger from "electron-log";

import { splashWindow, createSplashWindow } from "./window/splash";
import { mainWindow, createMainWindow, state as mainState } from "./window/main";
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

    if (process.platform === "win32") {
        (app as any).setAppUserModelId("pinkcoin.wallet.desktop.ui");
    }
}

// Required on Linux platorm (bug workaround).
// Without it transparent window is black or white.
if (process.platform === "linux") {
    app.disableHardwareAcceleration();
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

app.on("second-instance", () => {
    if (process.mas) return false;
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

logger.transports.file.level = "info";

app.on("ready", () => {

    logger.info("App is starting...");

    // setTimeout as a workaround for transparency issue
    // https://github.com/electron/electron/issues/2170
    // https://bugs.chromium.org/p/chromium/issues/detail?id=854601#c7
    setTimeout(() => {

        createTray();
        createMainWindow();

        // Circumvents issue with CSS animation stuttering on app launch.
        setImmediate(createSplashWindow);

        // Will be removed by Webpack in production.
        if (process.env.NODE_ENV !== "production") {
            // Workaround: patches webrequest to fix devtools incompatibility with electron >= 2.0
            // See https://github.com/electron/electron/issues/13008#issuecomment-400261941
            session.defaultSession.webRequest.onBeforeRequest(
                {} as Electron.OnBeforeRequestFilter,
                (details, callback) => {
                    if (details.url.indexOf("7accc8730b0f99b5e7c0702ea89d1fa7c17bfe33") !== -1) {
                        callback({
                            redirectURL: details.url.replace(
                                "7accc8730b0f99b5e7c0702ea89d1fa7c17bfe33",
                                "57c9d07b416b5a2ea23d28247300e4af36329bdc"
                            )
                        });
                    } else if (details.url.indexOf("164c37e3f235134c88e80fac2a182cfba3f07f00") !== -1) {
                        callback({
                            redirectURL: details.url.replace(
                                "164c37e3f235134c88e80fac2a182cfba3f07f00",
                                "a10b9cedb40738cb152f8148ddab4891df876959"
                            )
                        });
                    } else {
                        callback({ cancel: false })
                    }
                }
            );
        }

    }, 300);
});

app.on("activate", () => {
    if (mainWindow === null) {
        createMainWindow();
        mainWindow.once("ready-to-show", () => {
            mainWindow.show();
        });
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        logger.info("App is quitting...");
        tray.destroy();
        app.quit();
    }
});

ipcMain.on("data-loaded", () => {

    splashWindow.destroy();
    mainWindow.show();
    if (mainState.isMaximized) {
        mainWindow.maximize();
    }

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {
        mainWindow.webContents.openDevTools({ mode : "detach" });
    }
});
