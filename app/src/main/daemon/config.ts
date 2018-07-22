
import path from "path";
import crypto from "crypto";


function randomizeAuth(): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(50, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString("hex"));
            }
        });
    });
}

export interface Auth {
    username: string;
    password: string;
}

export const auth: Auth = {
    username: "",
    password: ""
}

export async function initAuth(): Promise<Auth> {

    const [ username, password ] = await Promise.all([
        randomizeAuth(),
        randomizeAuth()
    ]);

    auth.username = username;
    auth.password = password;

    return auth;
}


let binary = "pink2d";
if (process.platform === "win32") binary += ".exe";

export default {
    auth,
    mainDir: path.join(__dirname, "..", "daemon"),
    dataDir: path.join(__dirname, "..", "daemon", "data"),
    command: path.join(__dirname, "..", "daemon", binary),
};
