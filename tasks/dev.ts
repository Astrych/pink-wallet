
import { spawn, ChildProcess } from "child_process";
import kill from "tree-kill";
import del from "del";
import extend from "xtend";
import { task, watch, series } from "gulp";
import Browser from "browser-sync";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import { rendererConfig } from "./webpack.renderer.config";
import { config } from "./config";


/**
 * Removes build and release folders.
 */
export function clean() {

    return del([`${config.dirs.build}`, `${config.dirs.release}`], { force: true });
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
            `${config.dirs.app.src}/splash.html`,
            `${config.dirs.app.src}/main.html`
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

            process.on("SIGINT" as "loaded", () => {
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

    // Watches window ts files and stop app if necessary (change occures).
    watch(`${config.dirs.app.src}/main/**/*.ts`, series("stop app"));

    done();
}
