
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
        event.sender.send("app-set-init-state", {
            theme: appState.theme,
            language: appState.language,
        });
    }
});
