
import { CHANGE_THEME } from "./settings/types";


export default {

    [CHANGE_THEME]: async ({ action, dispatch, state }) => {

        console.log("DISPATCH TEST!");
        dispatch({
            type: "SUCCESS"
        });
    }
};
