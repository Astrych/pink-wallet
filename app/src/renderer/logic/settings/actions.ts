
import { CHANGE_THEME, CHANGE_LANGUAGE, SHOW_SETTINGS, HIDE_SETTINGS } from "./types";


export const changeTheme = (theme: string) => ({
    type: CHANGE_THEME,
    payload: theme
});

export const changeLanguage = (language: string) => ({
    type: CHANGE_LANGUAGE,
    payload: language
});

export const showSettings = () => ({
    type: SHOW_SETTINGS
});

export const hideSettings = () => ({
    type: HIDE_SETTINGS
});
