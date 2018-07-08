
import { CHANGE_THEME } from "./types";


export const changeTheme = (theme: string) => ({
    type: CHANGE_THEME,
    payload: theme
});
