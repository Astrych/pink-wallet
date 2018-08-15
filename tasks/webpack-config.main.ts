
import { join } from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import CopyWebpackPlugin from "copy-webpack-plugin";

import { getExtenrals } from "./utils";
import { config, isDev as dev } from "./config";


const appNodeModules = join(config.dirs.build as string, "node_modules");

export const mainConfig: webpack.Configuration = {

    mode: config.releaseType,
    devtool: dev ? "eval-source-map" : "source-map",
    context: config.dirs.app.src,
    entry: {
        app: "./main/app.ts"
    },
    output: {
        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: config.dirs.build
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".node"],
        modules: dev ? [appNodeModules] : [],
        alias: {
            "package.json": join(config.dirs.app.main, "package.json"),
            "@common": join(config.dirs.app.src, "common"),
            "@app-utils": join(config.dirs.app.src, "main/utils"),
        }
    },
    module: {
        rules: [
            { test: /\.ts$/, enforce: "pre", loader: "tslint-loader" },
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    target: "electron-main",
    node: {
        __dirname: false,
        __filename: false
    },
    externals: [
        nodeExternals({ modulesFromFile: true }),
        getExtenrals(config.dirs.app.main)
    ],
    plugins: [
        // Copies icons to build directory.
        new CopyWebpackPlugin([
            {
                from: join(config.dirs.app.assets, "icons"),
                to: join(config.dirs.build, "icons")
            }
        ]),
        // Sets environment variables for app.
        new webpack.EnvironmentPlugin({
            SPLASH_VIEW: `${dev ? "http://localhost:3000/" : ""}splash.html`,
            MAIN_VIEW: `${dev ? "http://localhost:3000/" : ""}main.html`,
            APP_TITLE: config.appTitle
        })
    ]
}
