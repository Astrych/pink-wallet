
import produce from "immer";

import { CHANGE_THEME } from "./types";


const initialState = {

    currentTheme: "dark",
    themes: ["dark", "light"]
};

const reducer = produce((draft, action) => {

    switch (action.type) {
        case CHANGE_THEME: {
            draft.currentTheme = action.payload;
        }
    }

}, initialState);


export default {

    initialState,
    reducer
};
