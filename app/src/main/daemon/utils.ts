
import fs from "fs";
import { Readable } from "stream";
import crypto from "crypto";


export async function* chunksToLines(chunks: Readable): AsyncIterable<string> {

    if (!chunks) throw new Error("Parameter is undefined!");
    if (!(Symbol.asyncIterator in chunks)) {
        throw new Error("Parameter is not an asynchronous iterable");
    }

    let previous = "";

    for await (const chunk of chunks) {
        previous += chunk;
        let eolIndex;
        while ((eolIndex = previous.indexOf("\n")) >= 0) {
            // Line includes the EOL.
            const line = previous.slice(0, eolIndex + 1);
            yield line;
            previous = previous.slice(eolIndex + 1);
        }
    }
    if (previous.length > 0) {
        yield previous;
    }
}

const RE_NEWLINE = /\r?\n$/u;

export function stripEndOfLine(line: string): string {
    const match = RE_NEWLINE.exec(line);
    if (! match) return line;
    return line.slice(0, match.index);
}

export async function calcChecksum(filePath: string) {

    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    for await (const chunk of stream) {
        hash.update(chunk);
    }

    return hash.digest("hex");
}
