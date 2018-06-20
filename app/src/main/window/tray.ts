
import { app, Tray, Menu } from "electron";

import { splashWindow } from "./splash";
import { mainWindow } from "./main";


function toggleWindow() {

    if (splashWindow && !splashWindow.isDestroyed()) {

        if (!splashWindow.isVisible()) {
            splashWindow.show();
        } else {
            splashWindow.hide();
        }

    } else if (mainWindow && !mainWindow.isDestroyed()) {

        if (!mainWindow.isVisible()) {
            mainWindow.show();
        } else {
            mainWindow.hide();
        }
    }
}

const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
        label: `Show/Hide ${process.env.APP_TITLE}`,
        click() {
            toggleWindow();
        }
    },
    { type: "separator" },
    {
        label: "Quit",
        click() {
            tray.destroy();
            app.quit();
        }
    },
];

export let tray: Tray | null;

export function createTray() {

    tray = new Tray(`${__dirname}/img/icon-256x256.png`);

    tray.setToolTip(process.env.APP_TITLE);

    const contextMenu = Menu.buildFromTemplate(menuTemplate);
    tray.setContextMenu(contextMenu);
}
