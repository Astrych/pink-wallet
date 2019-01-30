
import {

    app,
    session,
    BrowserWindow

} from "electron";


import { initAutoUpdater } from "./auto-updater";
import { createSplashWindow } from "./windows/splash";
import { createMainWindow } from "./windows/main";
import { createTray } from "./windows/tray";
import { startDaemon } from "./daemon/runner";
import logger from "./logger";
import "./ipc-channels";

import { sleep } from "@common/utils";


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

// TODO: Remove it from production??
if (process.platform === "win32") {
    app.setAppUserModelId("com.electron.pinkcoin");
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


let mainWindow: BrowserWindow | null;
let splashWindow: BrowserWindow | null;

app.on("ready", async () => {

    logger.info("App is starting...");

    initAutoUpdater();

    // Sleep as a workaround for transparency issue
    // https://github.com/electron/electron/issues/2170
    // https://github.com/electron/electron/issues/15947
    // https://bugs.chromium.org/p/chromium/issues/detail?id=854601
    await sleep(300);

    [ mainWindow, splashWindow ] = await Promise.all([
        createMainWindow(),
        createSplashWindow(startDaemon),
    ]);

    createTray(mainWindow, splashWindow);

    // Sets CSP headers.
    if (session.defaultSession) {
        session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
            const allowedHosts = [
                "https://at.alicdn.com"
            ];
            const allowed = allowedHosts.some(host => {
                return details.url.includes(host);
            });

            if (!allowed) {
                details.responseHeaders["Content-Security-Policy"] = "default-src 'none'; script-src 'self'";
            }
            cb({ responseHeaders: details.responseHeaders, cancel: false });
        });
    }

    if (process.env.NODE_ENV !== "production") {
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
    }
});

app.on("activate", async () => {
    if (mainWindow === null) {
        mainWindow = await createMainWindow();
        mainWindow.once("ready-to-show", () => {
            mainWindow && mainWindow.show();
        });
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        logger.info("App is quitting...");
        app.quit();
    }
});

// Security stuff.
app.on("web-contents-created", (_, contents) => {
    // Disables navigation to external pages.
    contents.on("will-navigate", (event, _) => {
        event.preventDefault();
    });
    // Disables creation of new windows.
    contents.on("new-window", (event, _) => {
        event.preventDefault();
    });
});
