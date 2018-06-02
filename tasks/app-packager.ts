import path from "path";
import { task, series } from "gulp";
import packager from "electron-packager";

import { config } from "./config";


/**
 * Creates release versions.
 */
function release(platform: string) {

    interface Options {
        dir: string,
        platform: string,
        arch: string,
        out: string,
        overwrite: boolean,
        asar: boolean,
        prune: boolean,
        icon: string,
        win32metadata?: object
    }

    return done => {

        const options: Options = {

            dir: config.dirs.build,
            platform,
            arch: "x64",
            out: `${config.dirs.release}`,
            overwrite: true,
            asar: true,
            prune: true,
            icon : path.join(config.dirs.app.assets, "img", "icon-256x256")
        };

        if (platform === "win32") {
            options.win32metadata = {
                FileDescription: config.appTitle
            }
        }

        packager(options)
        .then(appPaths => {
            console.info("Destination paths:", ...appPaths);
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            done();
        });
    };
}


const taskName1 = "prepare Linux release";
const taskName2 = "prepare Windows release";
const taskName3 = "prepare MacOS release";
const taskName4 = "prepare releases for all platforms";

task(taskName1, release("linux"));
task(taskName2, release("win32"));
task(taskName3, release("darwin"));
task(taskName4, release("all"));

export default {

    linux: series(taskName1),
    windows: series(taskName2),
    mac: series(taskName3),
    all: series(taskName4)
};
