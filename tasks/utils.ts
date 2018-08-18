
import fs from "fs";
import { resolve } from "path";

import { isDev as dev } from "./config";

/**
 * Returns list of packages based on package.json.
 */
export function getExternals(jsonDir: string) {

    let packageJson = {};

    try {
        const packageJsonString = fs.readFileSync(resolve(jsonDir, "package.json"), "utf8");
        packageJson = JSON.parse(packageJsonString);

    } catch {
        return [];
    }

    // Collects dependencies.
    const deps = {};
    Object.keys(packageJson["dependencies"] || {}).forEach(dep => {
        deps[dep] = true;
    });
    if (dev) {
        Object.keys(packageJson["devDependencies"] || {}).forEach(dep => {
            deps[dep] = true;
        });
    }

    return Object.keys(deps);
}
