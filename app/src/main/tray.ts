
import { app, Tray, Menu } from "electron";

import { splashWindow } from "./splash-window";
import { mainWindow } from "./main-window";


const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    { label: process.env.APP_TITLE },
    { type: "separator" },
    {
        label: "Quit",
        click() {
            tray.destroy();
            app.quit();
        }
    }
];

export let tray: Tray | null;

export function createTray() {

    tray = new Tray(`${__dirname}/img/icon-256x256.png`);

    tray.setToolTip(process.env.APP_TITLE);

    const contextMenu = Menu.buildFromTemplate(menuTemplate);
    tray.setContextMenu(contextMenu);

    tray.on("double-click", event => {
        if (splashWindow && !splashWindow.isDestroyed()) {

            if (splashWindow.isVisible()) {
                splashWindow.hide();

            } else {
                splashWindow.show();
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
