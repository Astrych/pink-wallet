/**
 * Settings action's creators.
 * @module settings/actions
 * @see module:settings/reducer
 * @see module:settings/selectors
 */

 import { CHANGE_THEME } from "./constants";


export const changeTheme = (theme) => ({
    type: CHANGE_THEME,
    payload: theme
});
