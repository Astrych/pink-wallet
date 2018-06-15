/**
 * Settings reducers.
 * @module settings/reducer
 * @see module:settings/actions
 * @see module:settings/selectors
 */

import { CHANGE_THEME } from "./constants";


const initialState = {

    currentTheme: "dark",
    themes: ["dark", "light"]
};

function reducer(state=initialState, action) {

    switch (action.type) {
        case CHANGE_THEME: {
            return { ...state, currentTheme: action.payload };
        }
    }

    return state;
}

export default {

    initialState,
    reducer
};
