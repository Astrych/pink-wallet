
// Base gulp modules.
import { task, series } from "gulp";

// Imports build tasks definitions.
import appBuilder from "./tasks/app-builder";
import appPackager from "./tasks/app-packager";

// Imports development tasks.
import {

    clean,
    cleanAll,
    removeBuildCode,
    copyConfigFiles,
    installVendorLibs,
    serveRendererView,
    monitorWindowFiles

} from "./tasks/dev";
import { platform } from "./tasks/config";


task("clean", clean);
task("clean-all", cleanAll);
task("remove build code", removeBuildCode);

// Prepares build folder + app vendor libs.
task("copy config files", copyConfigFiles);
task("install vendor libs", installVendorLibs);

// Build tasks.
task("build: development", appBuilder.mainTask);
task("build: production", appBuilder.allTasks);

task("serve and watch UI", serveRendererView);
task("watch window files", monitorWindowFiles);

// Post-install init.
task("init", series(

    "copy config files",
    "install vendor libs",
));

// Development main task.
task("start", series(

    "remove build code",
    "copy config files",
    "install vendor libs",
    "build: development",
    "serve and watch UI",
    "watch window files"
));

task("default", series("start"));

// Production build task.
task("builder", series(

    "clean",
    "copy config files",
    "install vendor libs",
    "build: production",
    appPackager[platform]
));
