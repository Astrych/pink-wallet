
import { join } from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import imageminPngquant from "imagemin-pngquant";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

import { config, isDev as dev, analyze } from "./config";


export const rendererConfig: webpack.Configuration = {

    mode: config.releaseType,
    devtool: dev ? "inline-source-map" : "source-map",
    entry: {
        "main-bundle":   [join(config.dirs.app.src, "renderer/main.tsx")],
        "splash-bundle": [join(config.dirs.app.src, "renderer/splash.tsx")],
    },
    output: {
        pathinfo:      dev ? true : false,
        filename:      "[name].js",
        libraryTarget: "commonjs2",
        path:          config.dirs.build,
        publicPath:    "./",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
            "@assets":     config.dirs.app.assets,
            "@view-utils": join(config.dirs.app.src, "renderer/utils"),
            "@view-logic": join(config.dirs.app.src, "renderer/logic"),
            "@components": join(config.dirs.app.src, "renderer/components"),
            "@common":     join(config.dirs.app.src, "common"),
        },
    },
    module: {
        strictExportPresence: true,
        rules: [
            { parser: { requireEnsure: false } },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            plugins: [
                                "@babel/syntax-dynamic-import",
                                "react-hot-loader/babel"
                            ],
                            cacheDirectory: true,
                            cacheCompression: dev ? false : true,
                            compact: dev ? false : true,
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            configFile: "tsconfig-renderer.json",
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 200000
                    }
                },
            },
            {
                test: /\.png$/i,
                use: [
                    "url-loader",
                    {
                        loader: "img-loader",
                        options: {
                            plugins: [
                                imageminPngquant()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.svg$/i,
                use: [
                    "svg-sprite-loader"
                ]
            },
        ]
    },
    target: "electron-renderer",
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: null,
            exclude: ["node_modules", "build/node_modules"],
            test: /\.tsx?($|\?)/i
        }),
        new ForkTsCheckerWebpackPlugin({
            silent: true,
            tsconfig: "./tsconfig-renderer.json",
            tslint: "./tslint.json",
            reportFiles: [
                "!**/*.json",
                "!**/__tests__/**",
                "!**/?(*.)(spec|test).*",
            ],
            watch: [
                join(config.dirs.app.src, "renderer"),
                join(config.dirs.app.src, "common"),
            ],
            workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
        }),
        new HtmlWebpackPlugin({
            title: config.appTitle,
            template: join(config.dirs.app.src, "template.html"),
            filename: "splash.html",
            chunks: ["splash-bundle"],
        }),
        new HtmlWebpackPlugin({
            title: config.appTitle,
            template: join(config.dirs.app.src, "template.html"),
            filename: "main.html",
            chunks: ["main-bundle"],
        }),
        analyze && new BundleAnalyzerPlugin(),

    // Removes non-plugin boolean
    // values from conditional checks.
    ].filter(Boolean)
};
