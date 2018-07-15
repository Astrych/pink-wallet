
import axios from "axios";


const messageSwitcher = (errors, code) => (errors)[code];

export async function apiCall(reqData, errors={}) {

    try {
        return await axios(reqData);

    } catch (err) {
        console.error(err);
        if (err.code) {
            throw messageSwitcher(errors, err.code);
        } else {
            throw { message: "Connection error!" };
        }
    }
}
