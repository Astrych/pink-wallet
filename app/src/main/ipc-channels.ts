
import { app, ipcMain } from "electron";

import {

    window as mainWindow,
    state as mainWindowState

} from "./windows/main";
import { window as splashWindow } from "./windows/splash";


ipcMain.on("splash-loading-finished", () => {

    // Closes splash screen...
    splashWindow && splashWindow.destroy();

    // ... and opens up main window.
    if (mainWindow) {

        mainWindow.show();

        if (mainWindowState.isMaximized) {
            mainWindow.maximize();
        }

        if (process.env.NODE_ENV !== "production") {
            mainWindow.webContents.openDevTools({ mode : "detach" });
        }
    }
});

ipcMain.on("app-shutdown", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.close();
    }
    if (splashWindow && !splashWindow.isDestroyed()) {
        splashWindow.close();
    }
    app.quit();
});
