
import { join } from "path";

import { config } from "../tasks/config";


export default (_, __, defaultConfig) => {

    defaultConfig.module.rules = [
        {
            test: /\.tsx?$/,
            use: [{
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        rootDir: join(config.dirs.app.src, "renderer")
                    }
                }
            }]
        },
        {
            test: /\.svg$/,
            use: [ "svg-sprite-loader" ]
        },
    ];
    defaultConfig.resolve.extensions.push(".ts", ".tsx", ".jsx");
    defaultConfig.resolve.alias = {
        ...defaultConfig.resolve.alias,
        "@assets": config.dirs.app.assets,
        "@logic": join(config.dirs.app.src, "renderer/logic"),
        "@components": join(config.dirs.app.src, "renderer/components"),
        "@common": join(config.dirs.app.src, "common"),
    };

    return defaultConfig;
};
