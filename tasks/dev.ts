
import { join } from "path";
import { spawn, ChildProcess } from "child_process";
import kill from "tree-kill";
import del from "del";
import extend from "xtend";
import { task, src, dest, watch, series } from "gulp";
import changed from "gulp-changed";
import install from "gulp-install";
import Browser from "browser-sync";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { rendererConfig } from "./webpack-config.renderer";
import { config } from "./config";


/**
 * Removes build and release folders.
 */
export function clean() {

    return del([`${config.dirs.build}`, `${config.dirs.release}`], { force: true });
}


export function cleanAll() {

    return del([
        `${config.dirs.build}`,
        `${config.dirs.release}`,
        "node_modules",
        "coverage"
    ], { force: true });
}


/**
 * Installs app vendor libs.
 */
export function installAppLibs() {

    return src("{*.json,.npmrc,LICENSE}", { cwd: config.dirs.app.main })
              .pipe(changed(config.dirs.build))
              .pipe(dest(config.dirs.build))
              .pipe(install({}));
}


/**
 * Creates electron app process.
 */
function runElectronApp(path: string, env: object={}) {

    let command = "electron";
    if (process.platform === "win32") command += ".cmd";

    return spawn(command, [path], {
        cwd: path,
        env: extend({ NODE_ENV: "development" }, env, process.env),
        stdio: "inherit"
    });
}


let appProccess: ChildProcess;
let devServer: Browser.BrowserSyncInstance;
let devBundler: webpack.Compiler;

/**
 * Compiles/packs files and runs development server for HMR.
 */
export function serveRendererView(done: Function) {

    devServer = Browser.create();
    devBundler = webpack(rendererConfig);

    const options: Browser.Options = {

        ui: false,
        ghostMode: false,
        open: false,
        notify: false,
        logSnippet: false,
        logFileChanges: false,
        localOnly: true,
        server: config.dirs.build,
        middleware: [

            webpackDevMiddleware(devBundler, {
                stats: "minimal",
                hot: true
            }),
            webpackHotMiddleware(devBundler)
        ],
        files: [
            join(config.dirs.app.src, "template.html")
        ],
        logLevel: "silent"
    };

    devServer.init(options, err => {

        if (err) return done(err);

        appProccess = runElectronApp(config.dirs.build);

        appProccess.on("close", () => {
            process.exit();
        });

        if (process.platform !== "win32") {

            process.on("SIGINT", () => {
                kill(appProccess.pid, "SIGKILL");
                process.exit();
            });
        }

        done();
    });
}

/**
 * Watches for files changes - window process.
 */
export function monitorWindowFiles(done: Function) {

    // Task stoping application.
    task("stop app", done => {
        kill(appProccess.pid, "SIGKILL");
        done();
    });

    // Notice: backslash absolute paths are not working outside cwd param.
    watch("main/**/*.ts", { cwd: config.dirs.app.src }, series("stop app"))
    .on("raw", (event, path, details) => {
      console.log("[Main watch] Info:", event, path, details);
    });

    done();
}
