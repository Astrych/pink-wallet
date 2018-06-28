
import { CHANGE_THEME } from "./settings/types";
import { themeListener } from "./settings/listeners"


export default [{

    [CHANGE_THEME]: themeListener
}];
