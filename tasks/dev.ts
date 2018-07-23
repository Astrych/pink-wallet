
import { spawn, ChildProcess } from "child_process";
import kill from "tree-kill";
import del from "del";
import extend from "xtend";
import { task, src, dest, watch, series } from "gulp";
import changed from "gulp-changed";
import install from "gulp-install";
import { Server } from "http";
import Koa from "koa";
import serveStatic from "koa-static";
import koaWebpack from "koa-webpack";

import { rendererConfig } from "./webpack-config.renderer";
import { config } from "./config";


/**
 * Removes build and release folders.
 */
export function removeBuildCode() {

    return del([`${config.dirs.build}/*.{js,map,html}`], { force: true });
}

/**
 * Removes build and release folders.
 */
export function clean() {

    return del([`${config.dirs.build}`, `${config.dirs.release}`], { force: true });
}


/**
 * Removes all dev and build folders.
 */
export function cleanAll() {

    return del([
        `${config.dirs.build}`,
        `${config.dirs.release}`,
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

    return spawn(command, [path, "--testnet"], {
        cwd: path,
        env: extend({ NODE_ENV: "development" }, env, process.env),
        stdio: "inherit"
    });
}


let appProccess: ChildProcess | null = null;
let devServer: Server | null = null;

/**
 * Compiles/packs files and runs development server for HMR.
 */
export async function serveRendererView() {

    const app = new Koa();

    app.use(serveStatic(config.dirs.build));

    const middleware = await koaWebpack({
        config: rendererConfig,
        devMiddleware: {
            stats: "minimal",
            lazy: false,
            publicPath: "/"
        },
        hotClient: {
            validTargets: [
                rendererConfig.target as string
            ],
        }
    });

    app.use(middleware);

    devServer = app.listen(3000);

    appProccess = runElectronApp(config.dirs.build);
    appProccess.on("close", () => {
        process.exit();
    });
    if (process.platform !== "win32") {
        process.on("SIGINT", () => {
            middleware.devMiddleware.close();
            devServer && devServer.close(() => {
                appProccess && kill(appProccess.pid, "SIGKILL");
                process.exit();
            });
        });
    }
}

/**
 * Watches for files changes - window process.
 */
export function monitorWindowFiles(done: Function) {

    // Task stoping application.
    task("stop app", done => {
        appProccess && kill(appProccess.pid, "SIGKILL");
        done();
    });

    // Notice: backslash absolute paths are not working outside cwd param.
    watch("main/**/*.ts", { cwd: config.dirs.app.src }, series("stop app"))
    .on("raw", (event, path, details) => {
      console.log("[Main watch] Info:", event, path, details);
    });

    done();
}
