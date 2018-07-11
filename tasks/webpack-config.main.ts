
import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

import { config, isDev as dev } from "./config";


const appNodeModules = path.join(config.dirs.build, "node_modules");

export const mainConfig: webpack.Configuration = {

    mode: config.releaseType,
    devtool: dev ? "eval-source-map" : "source-map",
    context: config.dirs.app.src,
    entry: {

        main: "./main/index.ts"
    },
    output: {

        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: config.dirs.build
    },
    resolve: {

        extensions: [".ts", ".js", ".json", ".node"],
        modules: [appNodeModules]
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
        nodeExternals(),
        nodeExternals({ modulesDir: appNodeModules })
    ],
    plugins: dev ? [

        new webpack.EnvironmentPlugin({
            SPLASH_VIEW: "http://localhost:3000/splash.html",
            MAIN_VIEW: "http://localhost:3000/main.html",
            APP_TITLE: config.appTitle
        })

    ] : [

        new webpack.EnvironmentPlugin({
            SPLASH_VIEW: "splash.html",
            MAIN_VIEW: "main.html",
            APP_TITLE: config.appTitle
        })
    ]
}
