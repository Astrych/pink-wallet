
import produce from "immer";

import { UNLOCK_WALLET, LOCK_WALLET } from "./types";
import { AuthActions } from "./actions";


interface AuthState {

}

const initialState: AuthState = {

};

const reducer = produce((draft: AuthState, action: AuthActions) => {

    switch (action.type) {
        case UNLOCK_WALLET: {
            break;
        }
        case LOCK_WALLET: {
            break;
        }
    }

}, initialState);


export default {

    initialState,
    reducer,
};
