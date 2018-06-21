
import { combineReducers } from "redux"; 

import auth from "./auth/reducer";
import settings from "./settings/reducer";


export interface State {

    auth: typeof auth.initialState;
    settings: typeof settings.initialState;
}

const rootReducer = combineReducers({

    auth: auth.reducer,
    settings: settings.reducer
});

export default rootReducer;
