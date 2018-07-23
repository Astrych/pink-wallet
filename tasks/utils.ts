
import fs from "fs";
import { resolve } from "path";


/**
 * Returns list of packages based on package.json.
 */
export function getExtenrals(jsonDir: string) {

    let packageJson = {};

    try {
        const packageJsonString = fs.readFileSync(resolve(jsonDir, "package.json"), "utf8");
        packageJson = JSON.parse(packageJsonString);

    } catch (e){
        return [];
    }

    // Collects dependencies.
    const deps = {};
    Object.keys(packageJson["dependencies"] || {}).forEach(dep => {
        deps[dep] = true;
    });

    return Object.keys(deps);
}
