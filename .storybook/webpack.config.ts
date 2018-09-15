
import { join } from "path";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

import { config } from "../tasks/config";


export default (_, __, defaultConfig) => {

    defaultConfig.module.rules = [
        {
            test: /\.tsx?$/,
            use: [{
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig-storybook.json",
                }
            }],
            exclude: [
                "node_modules",
                "build/node_modules",
                "tasks",
                "**/__tests__",
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
                "img-loader"
            ]
        },
        {
            test: /\.svg$/i,
            use: [
                "svg-sprite-loader"
            ]
        },
    ];
    defaultConfig.resolve.extensions.push(".ts", ".tsx", ".jsx");
    defaultConfig.resolve.alias = {
        ...defaultConfig.resolve.alias,
        "@assets": config.dirs.app.assets,
        "@view-utils": join(config.dirs.app.src, "renderer/utils"),
        "@view-logic": join(config.dirs.app.src, "renderer/logic"),
        "@components": join(config.dirs.app.src, "renderer/components"),
        "@common": join(config.dirs.app.src, "common"),
    };
    defaultConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin()
    );

    return defaultConfig;
};
