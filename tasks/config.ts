
import { normalize, join } from "path";
import args from "commander";


args
.option("-s --env <env>", "Environment", /^(development|production)$/i, "development")
.option("-s --platform <plt>", "Platform", /^(linux|windows|mac|all)$/i, "all")
.parse(process.argv);


function globalizePath(filespath: string) {
    return normalize(join(__dirname, "..", filespath));
}


function globalizePaths(conf: object) {

    for (const i in conf) {
        if (typeof conf[i] === "object") globalizePaths(conf[i]);
        else if (typeof conf[i] === "string") conf[i] = globalizePath(conf[i]);
    }
}


export const config = {

    releaseType: args.env,

    // Project directories.
    dirs: {

        app: {

            main: "app",
            src: "app/src",
            assets: "app/assets"
        },
        build: "build",
        release: "dist"
    },

    appTitle: "Pink Wallet"
};

// Replaces relative paths with global ones.
globalizePaths(config.dirs);


// Sets release type based on NODE_ENV variable if defined.
process.env.NODE_ENV && (config.releaseType = process.env.NODE_ENV as string);
export const isDev = config.releaseType === "production" ? false : true;

// Exports target platform (defaults to "all").
export const platform = args.platform;
