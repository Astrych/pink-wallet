
import path from "path";
import {

    app,
    Tray,
    Menu,
    BrowserWindow,
    shell

} from "electron";


export let tray: Tray;

export function createTray(mainWindow: BrowserWindow) {

    let icon = "icon-tray.png";
    if (process.platform === "win32") icon = "icon.ico";
    else if (process.platform === "linux") icon = "icon-tray@2x.png";

    tray = new Tray(path.join(__dirname, `img/${icon}`));
    tray.setToolTip(process.env.APP_TITLE as string);

    function toggleWindowVisibility() {

        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        }
    }

    function updateMenu() {

        const menuTemplate: Electron.MenuItemConstructorOptions[] = [
            {
                label: `${mainWindow.isVisible() ? "Hide" : "Show"} ${process.env.APP_TITLE}`,
                click() {
                    toggleWindowVisibility();
                }
            },
            { type: "separator" },
            {
                role: "help",
                submenu: [
                    {
                        label: "Visit Pinkcoin website",
                        click() { shell.openExternal("https://getstarted.with.pink/"); }
                    },
                    {
                        label: "Visit Donate4Life website",
                        click() { shell.openExternal("https://donate.with.pink/"); }
                    },
                    {
                        label: "Visit Pinkcoin blog",
                        click() { shell.openExternal("https://pinkbuffaloz.com/"); }
                    },
                ]
            },
            { type: "separator" },
            {
                label: "Quit",
                click() {
                    app.quit();
                }
            },
        ];

        const contextMenu = Menu.buildFromTemplate(menuTemplate);
        tray.setContextMenu(contextMenu);
    }

    updateMenu();

    tray.on("click", () => {
        toggleWindowVisibility();
    });
    mainWindow.on("show", () => {
        updateMenu();
        tray.setHighlightMode("always");
    });
    mainWindow.on("hide", () => {
        updateMenu();
        tray.setHighlightMode("never");
    });

    return tray;
}
