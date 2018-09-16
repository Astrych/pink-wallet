
import { CHANGE_THEME, SHOW_SETTINGS, HIDE_SETTINGS } from "./types";


export const changeTheme = (theme: string) => ({
    type: CHANGE_THEME,
    payload: theme
});

export const showSettings = () => ({
    type: SHOW_SETTINGS
});

export const hideSettings = () => ({
    type: HIDE_SETTINGS
});
