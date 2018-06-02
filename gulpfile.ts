
// Base gulp modules.
import { task, series, parallel } from "gulp";

// Imports build tasks definitions.
import appBuilder from "./tasks/app-builder";
import assetsBuilder from "./tasks/assets-builder";
import appPackager from "./tasks/app-packager";

// Imports development tasks.
import {
    
    clean,
    serveRendererView,
    monitorWindowFiles

} from "./tasks/dev";
import { platform } from "./tasks/config";


task("clean", clean);

// Build tasks.
task("prepare app: main part", appBuilder.mainTask);
task("prepare app: all parts", appBuilder.allTasks);
task("prepare libs and assets", assetsBuilder.tasks);

task("build: development", parallel([

    "prepare libs and assets",
    "prepare app: main part"
]));

task("build: production", parallel([

    "prepare libs and assets",
    "prepare app: all parts"
]));

task("serve UI and watch", serveRendererView);
task("watch window files", monitorWindowFiles);

// Development main task.
task("start", series([

    "build: development",
    "serve UI and watch",
    "watch window files"
]));

task("default", series("start"));

// Production build main task.
task("builder", series([ "clean", "build: production", appPackager[platform] ]));
