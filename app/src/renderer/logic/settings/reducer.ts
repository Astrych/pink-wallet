
import produce from "immer";

import { CHANGE_THEME, SHOW_SETTINGS, HIDE_SETTINGS } from "./types";
import { ThemeName } from "../theme";


// TODO: Port to Set<ThemeName> when this is ready:
// https://github.com/mweststrate/immer/issues/146
// https://github.com/mweststrate/immer/pull/149
interface SettingsState {
    currentTheme: ThemeName;
    themes: ThemeName[];
    settingsOpened: boolean;
}

const initialState: SettingsState = {

    currentTheme: "dark",
    themes: ["dark", "light", "default"],
    settingsOpened: false,
};

const reducer = produce((draft: SettingsState, action) => {

    switch (action.type) {
        case CHANGE_THEME: {
            draft.currentTheme = action.payload;
            break;
        }
        case SHOW_SETTINGS: {
            draft.settingsOpened = true;
            break;
        }
        case HIDE_SETTINGS: {
            draft.settingsOpened = false;
        }
    }

}, initialState);


export default {

    initialState,
    reducer
};
