
import { BrowserWindow } from "electron";


export function createSplashScreen() {

    const splashScreen = new BrowserWindow({
        width: 810,
        height: 610,
        resizable: false,
        transparent: true,
        frame: false,
        show: false,
        skipTaskbar: true,
        icon: `${__dirname}/img/icon-256x256.png`
    });

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {
        splashScreen.loadURL(process.env.SPLASH_VIEW);

    } else {
        splashScreen.loadFile(process.env.SPLASH_VIEW);
    }

    splashScreen.once("ready-to-show", () => {

        splashScreen.show();
    });

    return splashScreen;
}
