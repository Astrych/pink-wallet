/**
 * Redux store creator.
 * @module store
 */

import {

    createStore,
    combineReducers,
    applyMiddleware,
    compose

} from "redux";
import thunk from "redux-thunk";

import { auth } from "./auth/reducer";
import { settings } from "./settings/reducer";


const rootReducer = combineReducers({

    auth,
    settings
});

// Devtools store integration.
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(

    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
