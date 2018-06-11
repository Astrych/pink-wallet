
import { combineReducers } from "redux"; 

import { auth } from "./auth/reducer";
import { settings } from "./settings/reducer";


const rootReducer = combineReducers({

    auth,
    settings
});

export default rootReducer;
