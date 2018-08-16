
import { join } from "path";
import webpack from "webpack";
import HappyPack from "happypack";
import nodeExternals from "webpack-node-externals";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin";

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
        filename:      "[name].js",
        libraryTarget: "commonjs2",
        path: config.dirs.build,
    },
    resolve: {
        extensions: [".ts", ".js", ".json", ".node"],
        modules: dev ? [appNodeModules] : [],
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
                exclude: /node_modules/,
                loader: "happypack/loader?id=ts"
            }
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
        new FriendlyErrorsWebpackPlugin(),
        new HardSourceWebpackPlugin({
            cacheDirectory: "node_modules/.cache/main-source/[confighash]",
            info: {
                mode: "none",
                level: "warn"
            }
        }),
        new HappyPack({
            id: "ts",
            threads: 2,
            loaders: [
                {
                    path: "ts-loader",
                    options: {
                        happyPackMode: true,
                    }
                }
            ]
        }),
        new ForkTsCheckerWebpackPlugin({
            silent: true,
            checkSyntacticErrors: true,
            tsconfig: "../../tsconfig.json",
            tslint:   "../../tslint.json",
            watch:    ["./main"],
            workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
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
            SPLASH_VIEW: `${dev ? "http://localhost:3000/" : ""}splash.html`,
            MAIN_VIEW:   `${dev ? "http://localhost:3000/" : ""}main.html`,
            APP_TITLE: config.appTitle,
        }),
    ]
}

if (dev) {
    mainConfig.optimization = {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    }
}
