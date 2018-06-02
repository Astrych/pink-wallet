/**
 * Redux store creator.
 * @module store
 */

import { createStore, combineReducers, applyMiddleware } from "redux";
import { auth } from "./auth/auth-reducer";


// Midleware allowing usage of async functions.
const thunk = store => {

    const dispatch = store.dispatch;
    const getState = store.getState;

    return next => action => {

        if (typeof action === "function") {
            return action(dispatch, getState);
        }

        return next(action);
    }
}

const rootReducer = combineReducers({

    auth
});

export const store = createStore(

    rootReducer,
    applyMiddleware(thunk)
);
