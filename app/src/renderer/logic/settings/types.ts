
export const CHANGE_THEME = "[settings] change theme";
export const CHANGE_LANGUAGE = "[settings] change language";
export const SHOW_SETTINGS = "[settings] show settings";
export const HIDE_SETTINGS = "[settings] hide settings";

export type SETTINGS_TYPES = typeof CHANGE_THEME | typeof CHANGE_LANGUAGE |
                             typeof SHOW_SETTINGS | typeof HIDE_SETTINGS;
