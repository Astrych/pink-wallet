
import { normalize, join } from "path";
import args from "commander";


args
.option("-e, --env <env>", "Environment", /^(development|production)$/i, "development")
.option("-p, --platform <plt>", "Platform", /^(linux|windows|mac|all)$/i, "all")
.option("-r, --profile", "Generate webpack profile data")
.option("-a, --analyze", "Lunch Bundle Analyzer")
.parse(process.argv);


function absolutizePath(filespath: string) {
    return normalize(join(__dirname, "..", filespath));
}

interface Dirs {
    app: {
        main: string;
        src: string;
        assets: string;
    };
    build: string;
    release: string;
    devDaemon: string;
}

// TODO: Add types after this fix being impelmented:
// https://github.com/Microsoft/TypeScript/pull/25455
function absolutizeDirs(conf: Dirs) {
    return Object.keys(conf).reduce((acc, key) => {

        if (typeof conf[key] === "object") {
            return { ...acc as {}, [key]: absolutizeDirs(conf[key]) };
        }
        if (typeof conf[key] === "string") {
            return { ...acc as {}, [key]: absolutizePath(conf[key] as string) };
        }
        return { ...acc as {}, [key]: conf[key] as any };
    }, {});
}

type Release = "development" | "production";

export const config = {

    releaseType: args.env as Release,

    // Project directories (globalized).
    dirs: absolutizeDirs({

        app: {

            main: "app",
            src: "app/src" as string,
            assets: "app/assets"
        },
        build: "build",
        release: "dist",
        devDaemon: "daemon",
    }),

    appTitle: "Pink Wallet"
};


// Sets release type based on NODE_ENV variable if defined.
process.env.NODE_ENV && (config.releaseType = process.env.NODE_ENV as Release);
export const isDev = config.releaseType === "production" ? false : true;

type Platform = "linux" | "windows" | "mac " | "all";

// Exports target platform (defaults to "all").
export const platform: Platform = args.platform;

// Should we lunch bundle analyzer.
export const profile: boolean = args.profile;

// Should we lunch bundle analyzer.
export const analyze: boolean = args.analyze;
