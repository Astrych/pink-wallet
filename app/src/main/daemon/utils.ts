
import { join } from "path";
import fs from "fs";
import { promises as pfs } from "fs";
import { promisify } from "util";
import { Readable } from "stream";
import crypto from "crypto";
import zlib from "zlib";
import tar from "tar-fs";
import yauzl from "yauzl";

import logger from "../logger";
import { sleep } from "@common/utils";


export async function* chunksToLines(chunks: Readable): AsyncIterable < string > {

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
    if (!match) return line;
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

/**
 * Exctracts .zip files (Windows platforms).
 */
export async function unzip(sourcePath: string, destDir: string) {

    const bindOpen = yauzl.open.bind<typeof yauzl, [string, yauzl.Options], void>(yauzl);
    const open = promisify<string, yauzl.Options, yauzl.ZipFile>(bindOpen);
    const zipFile = await open(sourcePath, { lazyEntries: true });

    // HACK to fix type error. Is there any better option? ;/
    const bindZipFile = zipFile.openReadStream.bind<yauzl.ZipFile, [yauzl.Entry, any], void>(zipFile);
    const openReadStream = promisify<yauzl.Entry, Readable>(bindZipFile);

    return new Promise((resolve, reject) => {
        zipFile.readEntry();
        zipFile.on("entry", async (entry: yauzl.Entry) => {
            // Directory entry...
            if (/\/$/.test(entry.fileName)) {
                zipFile.readEntry();
            // File entry...
            } else {
                try {
                    const inputStream = await openReadStream(entry);
                    const outputStream = fs.createWriteStream(join(destDir, entry.fileName));

                    for await (const chunk of inputStream) {
                        outputStream.write(chunk);
                    }

                    outputStream.close();
                    zipFile.readEntry();

                } catch (err) { reject(err); }
            }
        });
        zipFile.on("close", () => {
            resolve();
        });
    });
}

/**
 * Exctracts .tar.gz files (non-Windows platforms).
 */
export async function untar(sourcePath: string, destDir: string) {
    const inputStream = fs.createReadStream(sourcePath);
    const unzip = zlib.createUnzip();
    const untar = tar.extract(destDir);

    inputStream.pipe(unzip).pipe(untar);

    return new Promise((resolve, reject) => {
        inputStream.on("error", reject);
        unzip.on("error", reject);
        untar.on("error", reject);
        untar.on("finish", () => {
            inputStream.close();
            resolve();
        });
    });
}

export async function isBussy(path: string) {

    while (true) {
        try {
            const file = await pfs.open(path, "r");
            file.close();
            break;

        } catch (err) {
            if (err.code !== "EBUSY") throw err;
            else {
                logger.debug("Unpacked daemon file is bussy. Waiting...");
                await sleep(100);
            }
        }
    }
}
