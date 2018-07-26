
import path from "path";


export default (baseConfig, env, defaultConfig) => {

    defaultConfig.module.rules.push({
      test: /\.tsx?$/,
      include: path.resolve(__dirname, "../app/src/renderer/stories"),
      loader: ["ts-loader"]
    });
    defaultConfig.resolve.extensions.push(".ts", ".tsx", ".js");

    return defaultConfig;
};
