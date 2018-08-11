
import { join } from "path";
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import tsImportPluginFactory from "ts-import-plugin";
import { BundleAnalyzerPlugin }  from "webpack-bundle-analyzer";

import { config, isDev as dev, analyze } from "./config";


export const rendererConfig: webpack.Configuration = {

    mode: config.releaseType,
    devtool: dev ? "eval-source-map" : "source-map",
    context: config.dirs.app.src,
    entry: {

        "main-bundle": [`./renderer/main.tsx`],
        "splash-bundle": ["./renderer/splash.tsx"],
    },
    output: {

        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: config.dirs.build,
        publicPath: "./"
    },
    resolve: {

        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
            "@assets": config.dirs.app.assets,
            "@logic": join(config.dirs.app.src, "renderer/logic"),
            "@components": join(config.dirs.app.src, "renderer/components"),
            "@common": join(config.dirs.app.src, "common"),
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
                ]
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
                test: /\.(ttf|eot|woff)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 500000
                    }
                },
            },
            {
                test: /\.png$/i,
                use: [
                    "url-loader",
                    "img-loader"
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
        new ForkTsCheckerWebpackPlugin({

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
            dev
        }),
        new HtmlWebpackPlugin({

            title: config.appTitle,
            template: "./template.html",
            filename: "main.html",
            chunks: ["main-bundle"],
            dev
        }),
        analyze && new BundleAnalyzerPlugin(),

    // Removes non-plugin boolean
    // values from conditional checks.
    ].filter(plugin => plugin != null)
}
