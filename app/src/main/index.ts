
import {

    app,
    Tray,
    ipcMain,
    session,
    BrowserWindow

} from "electron";

import { createSplashWindow } from "./windows/splash";
import {

    createMainWindow,
    state as mainWindowState

} from "./windows/main";
import { createTray } from "./windows/tray";
import { startDaemon } from "./daemon/runner";
import logger from "./logger";


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
        // any as a workaround for lack of typings for that function.
        (app as any).setAppUserModelId("com.electron.pinkcoin");
    }
}

// Required on Linux platorm (bug workaround).
// Without it transparent window is black or white.
if (process.platform === "linux") {
    app.disableHardwareAcceleration();
}

// Ensures only one instance of the application.
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) app.quit();

app.on("second-instance", () => {
    if (process.mas) return;
    if (splashWindow || mainWindow) {
        splashWindow && splashWindow.focus();
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    }
});


let tray: Tray;
let mainWindow: BrowserWindow | null;
let splashWindow: BrowserWindow | null;

app.on("ready", () => {

    logger.info("App is starting...");

    // setTimeout as a workaround for transparency issue
    // https://github.com/electron/electron/issues/2170
    // https://bugs.chromium.org/p/chromium/issues/detail?id=854601#c7
    setTimeout(() => {

        mainWindow = createMainWindow();
        splashWindow = createSplashWindow(startDaemon);

        if (process.env.NODE_ENV !== "production") {
            // Workaround: patches webrequest to fix devtools incompatibility with electron >= 2.0
            // See https://github.com/electron/electron/issues/13008#issuecomment-400261941
            if (session.defaultSession) {
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
        }

    }, 300);
});

app.on("activate", () => {
    if (mainWindow === null) {
        mainWindow = createMainWindow();
        mainWindow.once("ready-to-show", () => {
            mainWindow && mainWindow.show();
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

ipcMain.on("splash-finished", () => {

    splashWindow && splashWindow.destroy();
    if (mainWindow) {

        tray = createTray(mainWindow);
        mainWindow.show();

        if (mainWindowState.isMaximized) {
            mainWindow.maximize();
        }

        if (process.env.NODE_ENV !== "production") {
            mainWindow.webContents.openDevTools({ mode : "detach" });
        }
    }
});
