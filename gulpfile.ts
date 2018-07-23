
// Base gulp modules.
import { task, series } from "gulp";

// Imports build tasks definitions.
import appBuilder from "./tasks/app-builder";
import assetsBuilder from "./tasks/assets-builder";
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
task("prepare app: main part", appBuilder.mainTask);
task("prepare app: all parts", appBuilder.allTasks);
task("prepare assets", assetsBuilder.tasks);

task("build: development", series(

    "prepare assets",
    "prepare app: main part"
));

task("build: production", series(

    "prepare assets",
    "prepare app: all parts"
));

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
