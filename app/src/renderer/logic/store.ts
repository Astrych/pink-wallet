/**
 * Redux store creator.
 * @module store
 */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { auth } from "./auth/auth-reducer";


const rootReducer = combineReducers({

    auth
});

export const store = createStore(

    rootReducer,
    applyMiddleware(thunk)
);
