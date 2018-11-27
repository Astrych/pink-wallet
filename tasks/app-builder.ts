
// Base gulp modules.
import { promises as fs } from "fs";
import { task, parallel } from "gulp";
import webpack from "webpack";

// Builder configs.
import { mainConfig } from "./webpack-config.main";
import { rendererConfig } from "./webpack-config.renderer";
import { profile } from "./config";


function runWebpack(config: webpack.Configuration) {

    return () => new Promise((resolve, reject) => webpack(config, (err, stats) => {

        if (err) {
            console.error(err.stack || err);
            reject();
        } else {
            if (stats.hasErrors()) console.error(stats.toString("errors-only"));
            if (profile) {
                fs.writeFile("stats.json", JSON.stringify(stats.toJson(), null, 2), "utf8")
                .catch(console.error);
            }
            resolve();
        }
    }));
}


const taskName1 = "prepare main part -> copy/compile and pack";
const taskName2 = "prepare renderer part -> copy/compile and pack";

task(taskName1, runWebpack(mainConfig));
task(taskName2, runWebpack(rendererConfig));

export default {

    mainTask: parallel(taskName1),
    allTasks: parallel(taskName1, taskName2)
};
