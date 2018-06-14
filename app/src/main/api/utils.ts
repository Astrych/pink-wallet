import tls from "tls";
import axios from "axios";


// Workaround for bug:
// https://github.com/nodejs/node/issues/19359
// Fixed in node 10 and above (waiting for electron patch).
tls.DEFAULT_ECDH_CURVE = "auto";

const messageSwitcher = (errors, code) => (errors)[code];


export async function apiCall(reqData, errors={}) {

    try {
        return await axios(reqData);

    } catch (err) {
        console.error(err);
        if (err.code) {
            // ...
        } else {
            throw { message: "Connection error!" };
        }
    }
}
