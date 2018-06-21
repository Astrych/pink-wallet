
import { CHANGE_THEME } from "./types";


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
