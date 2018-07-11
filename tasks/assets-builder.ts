
// Base gulp modules.
import { task, parallel, src, dest } from "gulp";
import changed from "gulp-changed";

// Builder config.
import { installAppLibs } from "./dev";
import { config } from "./config";


function copyAssets() {

    return src("**/*.*", { cwd: config.dirs.app.assets })
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build));
}


const taskName1 = "prepare assets -> copy files";
const taskName2 = "prepare assets -> install vendor libs (if required)";

task(taskName1, copyAssets);
task(taskName2, installAppLibs);

export default {

    tasks: parallel(taskName1, taskName2)
};
