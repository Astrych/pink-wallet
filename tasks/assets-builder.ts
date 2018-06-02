
// Base gulp modules.
import { task, parallel, src, dest } from "gulp";
import changed from "gulp-changed";
import install from "gulp-install";

// Builder config.
import { config, isDev as dev } from "./config";


function copyGraphicalAssets() {

    return src(`${config.dirs.app.assets}/**/*.*`)
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build));
}

function installLibs() {

    return src(`${config.dirs.app.main}/{*.json,.npmrc,LICENSE}`)
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build))
              .pipe(install({ production: !dev }));
}


const taskName1 = "prepare assets -> copy graphics";
const taskName2 = "prepare assets -> copy package.json file";

task(taskName1, copyGraphicalAssets);
task(taskName2, installLibs);

export default {

    tasks: parallel(taskName1, taskName2)
};
