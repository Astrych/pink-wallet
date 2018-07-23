
import { inspect } from "util";


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function wholeObject(obj: object) {
    return inspect(obj, { depth: null });
}
