
import { CHANGE_THEME } from "./types";


export const changeTheme = theme => ({
    type: CHANGE_THEME,
    payload: theme
});
