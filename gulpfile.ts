
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
    installAppLibs,
    serveRendererView,
    monitorWindowFiles

} from "./tasks/dev";
import { platform } from "./tasks/config";


task("clean", clean);
task("clean-all", cleanAll);
task("remove build code", removeBuildCode);

// Prepares build folder + app vendor libs.
task("install app vendor libs", installAppLibs);

// Build tasks.
task("build: development", appBuilder.mainTask);
task("build: production", appBuilder.allTasks);

task("serve and watch UI", serveRendererView);
task("watch window files", monitorWindowFiles);

// Development main task.
task("start", series(

    "remove build code",
    "install app vendor libs",
    "build: development",
    "serve and watch UI",
    "watch window files"
));

task("default", series("start"));

// Production build task.
task("builder", series(

    "clean",
    "install app vendor libs",
    "build: production",
    appPackager[platform]
));
