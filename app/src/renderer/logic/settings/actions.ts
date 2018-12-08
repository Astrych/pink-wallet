
import { CHANGE_THEME, CHANGE_LANGUAGE, SHOW_SETTINGS, HIDE_SETTINGS } from "./types";
import { createAction, ActionsUnion } from "../helpers";
import { ThemeName } from "../theme";


export const changeTheme = (theme: ThemeName) => createAction(CHANGE_THEME, theme);
export const changeLanguage = (language: string) => createAction(CHANGE_LANGUAGE, language);

export const showSettings = () => createAction(SHOW_SETTINGS);
export const hideSettings = () => createAction(HIDE_SETTINGS);

export const SettingsActions = {
    changeTheme,
    changeLanguage,
    showSettings,
    hideSettings,
}

export type SettingsActions = ActionsUnion<typeof SettingsActions>;
