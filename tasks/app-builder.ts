
// Base gulp modules.
import { task, parallel } from "gulp";
import webpack from "webpack";

// Builder configs.
import { mainConfig } from "./webpack-config.main";
import { rendererConfig } from "./webpack-config.renderer";


function runWebpack(config) {

    return () => new Promise((resolve, reject) => webpack(config, (err, stats) => {

        if (err) {
            console.error(err.stack || err);
            reject();
        } else {
            console.log(stats.toString({
                assets: false,
                chunks: false,
                colors: true
            }));
            resolve();
        }
    }));
}


const taskName1 = "prepare main part -> compile and pack";
const taskName2 = "prepare renderer part -> compile and pack";

task(taskName1, runWebpack(mainConfig));
task(taskName2, runWebpack(rendererConfig));

export default {

    mainTask: parallel(taskName1),
    allTasks: parallel(taskName1, taskName2)
};
