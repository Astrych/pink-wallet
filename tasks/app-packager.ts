import path from "path";
import { task, series } from "gulp";
import packager, { platform as Platform } from "electron-packager";

import { config } from "./config";


// TODO: Replace or enhance with electron-builedr (?):
// https://www.electron.build/api/electron-builder/
// TODO: Add ordering params for asar.
// Possible with final version of packaged app:
// https://github.com/atom/atom/issues/10163
// https://imfly.github.io/electron-docs-gitbook/en/api/environment-variables.html
// https://github.com/electron-userland/electron-packager/blob/master/docs/api.md
/**
 * Creates release versions.
 */
function release(platform: Platform) {

    return (done: Function) => {

        const options: packager.Options = {

            dir: config.dirs.build,
            platform,
            arch: "x64",
            out: `${config.dirs.release}`,
            overwrite: true,
            asar: true,
            prune: true,
            icon : path.join(config.dirs.app.assets, "icons/icon")
        };

        if (platform === "win32") {
            options.win32metadata = {
                CompanyName: "Pinkcoin",
                FileDescription: config.appTitle
            }
        }

        if (platform === "darwin") {
            options.appCategoryType = "app-category-type=public.app-category.finance";
        }

        packager(options)
        .then((appPaths: string | string[]) => {
            if (Array.isArray(appPaths)) {
                console.info("Destination paths:", ...appPaths);
            } else {
                console.info("Destination path:", appPaths);
            }
        })
        .catch((err: Error) => {
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
