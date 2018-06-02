
// Base gulp modules.
import { task, parallel, src, dest } from "gulp";
import changed from "gulp-changed";
import install from "gulp-install";

// Builder config.
import { config, isDev as dev } from "./config";


function copyAssets() {

    return src("**/*.*", { cwd: config.dirs.app.assets })
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build));
}

function installLibs() {

    return src("{*.json,.npmrc,LICENSE}", { cwd: config.dirs.app.main })
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build))
              .pipe(install({ production: !dev }));
}


const taskName1 = "prepare assets -> copy files";
const taskName2 = "prepare assets -> install vendor libs if required";

task(taskName1, copyAssets);
task(taskName2, installLibs);

export default {

    tasks: parallel(taskName1, taskName2)
};
