
import { app, ipcMain } from "electron";

import {

    window as mainWindow,
    state as appState

} from "./windows/main";
import { window as splashWindow } from "./windows/splash";


ipcMain.on("splash-loading-finished", () => {

    // Closes splash screen...
    splashWindow && splashWindow.destroy();

    // ... and opens up main window.
    if (mainWindow) {

        mainWindow.show();

        if (appState.isMaximized) {
            mainWindow.maximize();
        }

        if (process.env.NODE_ENV !== "production") {
            mainWindow.webContents.openDevTools({ mode : "detach" });
        }
    }
});

ipcMain.on("window-get-state", (event: Electron.Event) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        if (mainWindow.isFullScreen()) {
            event.returnValue = "full-screen";
        } else if (mainWindow.isMaximized()) {
            event.returnValue = "maximized";
        } else if (mainWindow.isMinimized()) {
            event.returnValue = "minimized";
        } else if (mainWindow.isVisible()) {
            event.returnValue = "hidden";
        } else {
            event.returnValue = "normal";
        }
    } else {
        event.returnValue = "";
    }
});

ipcMain.on("window-minimize", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.minimize();
    }
});

ipcMain.on("window-maximize", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.maximize();
    }
});

ipcMain.on("window-unmaximize", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.unmaximize();
    }
});

ipcMain.on("window-close", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.close();
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

ipcMain.on("app-set-theme", (_: Electron.Event, data: { color: string, theme: string }) => {
    if (appState && appState.theme) {
        appState.theme = data.theme;
    }
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.setBackgroundColor(data.color);
    }
});

ipcMain.on("app-set-language", (_: Electron.Event, language: string) => {
    if (appState && appState.language) {
        appState.language = language;
    }
});

ipcMain.on("app-get-init-state", (event: Electron.Event) => {
    if (mainWindow) {
        event.returnValue = {
            language: appState.language,
            theme: appState.theme,
        };
    }
});
