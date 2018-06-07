
import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import tsImportPluginFactory from "ts-import-plugin";

import { config, isDev as dev } from "./config";


export const rendererConfig: webpack.Configuration = {

    mode: config.releaseType,
    devtool: dev ? "eval-source-map" : "source-map",
    context: config.dirs.app.src,
    entry: dev ? {

        "splash-bundle": [

            "./renderer/splash.tsx",
            "webpack-hot-middleware/client"
        ],
        "main-bundle": [

            "./renderer/main.tsx",
            "webpack-hot-middleware/client"
        ]

    } : {

        "splash-bundle": "./renderer/splash.tsx",
        "main-bundle": `./renderer/main.tsx`

    },
    output: {

        filename: "[name].js",
        libraryTarget: "commonjs2",
        path: config.dirs.build,
        publicPath: "./"
    },
    resolve: {

        extensions: [".tsx", ".ts", ".js", ".json"]
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
                            plugins: ["react-hot-loader/babel"],
                        },
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            compilerOptions: {
                                module: "esnext"
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
            }
        ]
    },
    target: "electron-renderer",
    node: {

        __dirname: false,
        __filename: false
    },
    plugins: dev ? [

        // Enables HMR globally.
        new webpack.HotModuleReplacementPlugin()

    ] : []
}

rendererConfig.plugins.unshift(

    new ForkTsCheckerWebpackPlugin({

        tsconfig: "../../tsconfig.json",
        tslint: "../../tslint.json",
        watch: ["./renderer"]
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
    })
);
