
import { CHANGE_THEME } from "./settings/types";
import {

    themeListener1,
    themeListener2,

} from "./settings/listeners"


export default [
    {
        [CHANGE_THEME]: themeListener1
    },
    {
        [CHANGE_THEME]: themeListener2
    },
];
