
import { join } from "path";
import webpack from "webpack";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

import { getExternals } from "./utils";
import { config, isDev as dev, profile } from "./config";


export const mainConfig: webpack.Configuration = {

    profile,
    mode: config.releaseType,
    devtool: dev ? "inline-source-map" : "source-map",
    context: config.dirs.app.src,
    entry: {
        app: "./main/app.ts"
    },
    output: {
        filename:      "[name].js",
        libraryTarget: "commonjs2",
        path:          config.dirs.build,
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".node"],
        alias: {
            "package.json": join(config.dirs.app.main, "package.json"),
            "@common":      join(config.dirs.app.src, "common"),
            "@app-utils":   join(config.dirs.app.src, "main/utils"),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    silent: true,
                    transpileOnly: true,
                },
                include: [
                    join(config.dirs.app.src, "main"),
                    join(config.dirs.app.src, "common")
                ],
                exclude: [
                    "node_modules",
                    "build/node_modules",
                    "tasks",
                    "**/__tests__/*.ts",
                    "**/stories"
                ],
            }
        ]
    },
    target: "electron-main",
    node: {
        __dirname: false,
        __filename: false
    },
    externals: getExternals(config.dirs.app.main),
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: null,
            exclude: ["node_modules", "build/node_modules"],
            test: /\.ts($|\?)/i
        }),
        new ForkTsCheckerWebpackPlugin({
            silent: true,
            tsconfig: "../../tsconfig.json",
            tslint:   "../../tslint.json",
            watch:    ["./main"],
            workers:  ForkTsCheckerWebpackPlugin.ONE_CPU,
        }),
        // Copies icons to build directory.
        new CopyWebpackPlugin([
            {
                from: join(config.dirs.app.assets, "icons"),
                to:   join(config.dirs.build, "icons"),
            }
        ]),
        // Sets environment variables for app.
        new webpack.EnvironmentPlugin({
            APP_TITLE:   config.appTitle,
            SPLASH_VIEW: `${dev ? "http://localhost:3000/" : ""}splash.html`,
            MAIN_VIEW:   `${dev ? "http://localhost:3000/" : ""}main.html`,
        }),
    ]
}
