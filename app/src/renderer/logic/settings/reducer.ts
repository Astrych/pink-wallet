
import produce from "immer";

import { CHANGE_THEME, CHANGE_LANGUAGE, SHOW_SETTINGS, HIDE_SETTINGS } from "./types";
import { ThemeName } from "../theme";


// TODO: Port to Set<ThemeName> when this is ready:
// https://github.com/mweststrate/immer/issues/146
// https://github.com/mweststrate/immer/pull/149
interface SettingsState {
    currentTheme: ThemeName;
    themes: ThemeName[];
    currentLanguage: string;
    settingsOpened: boolean;
}

const initialState: SettingsState = {

    currentTheme: "dark",
    themes: ["dark", "light", "default"],
    currentLanguage: "en",
    settingsOpened: false,
};

const reducer = produce((draft: SettingsState, action) => {

    switch (action.type) {
        case CHANGE_THEME: {
            draft.currentTheme = action.payload;
            break;
        }
        case CHANGE_LANGUAGE: {
            draft.currentLanguage = action.payload;
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
