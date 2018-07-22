
// Base gulp modules.
import { task, series, src, dest } from "gulp";
import changed from "gulp-changed";

// Builder config.
import { config } from "./config";


function copyAssets() {

    return src("**/*.*", { cwd: config.dirs.app.assets })
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build));
}


const taskName1 = "prepare assets -> copy files";

task(taskName1, copyAssets);

export default {

    tasks: series(taskName1)
};
