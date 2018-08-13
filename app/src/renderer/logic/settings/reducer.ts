
import produce from "immer";

import { CHANGE_THEME } from "./types";
import { ThemeName } from "../theme";


// TODO: Port to Set<ThemeName> when thisis ready:
// https://github.com/mweststrate/immer/issues/146
// https://github.com/mweststrate/immer/pull/149
interface SettingsState {
    currentTheme: ThemeName;
    themes: ThemeName[];
}

const initialState: SettingsState = {

    currentTheme: "dark",
    themes: ["dark", "light", "default"]
};

const reducer = produce((draft: SettingsState, action) => {

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
