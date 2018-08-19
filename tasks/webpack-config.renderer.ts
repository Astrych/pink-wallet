
import { join } from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import tsImportPluginFactory from "ts-import-plugin";
import imageminPngquant from "imagemin-pngquant";
import { BundleAnalyzerPlugin }  from "webpack-bundle-analyzer";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin";

import { config, isDev as dev, analyze } from "./config";


export const rendererConfig: webpack.Configuration = {

    mode: config.releaseType,
    devtool: dev ? "inline-source-map" : "source-map",
    context: config.dirs.app.src,
    entry: {
        "main-bundle":   [`./renderer/main.tsx`],
        "splash-bundle": ["./renderer/splash.tsx"],
    },
    output: {
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
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            plugins: [
                                "syntax-dynamic-import",
                                "react-hot-loader/babel"
                            ],
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                module: "esnext",
                                resolveJsonModule: false
                            },
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: "antd",
                                        libraryDirectory: "lib",
                                        style: true
                                    })
                                ]
                            }),
                        }
                    }
                ],
                include: [
                    join(config.dirs.app.src, "renderer"),
                    join(config.dirs.app.src, "common")
                ],
                exclude: [
                    "node_modules",
                    "build/node_modules",
                    "tasks",
                    "**/__tests__/*.ts",
                    "**/stories"
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insertAt: "top"
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            import: false
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true
                        }
                    }
                ]
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
        dev && new HardSourceWebpackPlugin({
            info: {
                mode: "none",
                level: "warn"
            }
        }),
        new ForkTsCheckerWebpackPlugin({
            silent: true,
            tsconfig: "../../tsconfig.json",
            tslint: "../../tslint.json",
            watch: ["./renderer"],
            workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
        }),
        new HtmlWebpackPlugin({
            title: config.appTitle,
            template: "./template.html",
            filename: "splash.html",
            chunks: ["splash-bundle"],
        }),
        new HtmlWebpackPlugin({
            title: config.appTitle,
            template: "./template.html",
            filename: "main.html",
            chunks: ["main-bundle"],
        }),
        analyze && new BundleAnalyzerPlugin(),

    // Removes non-plugin boolean
    // values from conditional checks.
    ].filter(plugin => (plugin && plugin != null))
}
