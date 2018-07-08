
import { Dispatch } from "redux";

import { go } from "./async-runner";
import { AppState } from "./root-reducer";


export interface ListenerParams {
    action: string;
    dispatch: Dispatch;
    state: AppState;
}

interface Listeners {
    [key: string]: (params: ListenerParams) => Promise<void>;
}

export class SideEffects {

    private listeners: Listeners[];

    constructor(listeners: Listeners[]) {
        this.listeners = listeners;
    }

    replaceListeners(listeners: Listeners[]) {
        this.listeners = listeners;
    }

    middleware() {

        function* callListeners(listeners, { action, dispatch, state }) {
            for (const listener of listeners) {

                if (listener[action.type]) {

                    yield listener[action.type]({

                        action,
                        dispatch,
                        state,
                    })
                    .catch(err => {
                        console.error(`Uncaught error in listener [${action.type}]!`, err);
                    });
                }
            }
        }

        return store => next => action => {
            const preActionState = store.getState();
            next(action);

            const onYield = ret => console.debug("ACTION LISTENER: SIDE EFFECTS", ret);

            go(callListeners(this.listeners, {
                action,
                dispatch: store.dispatch,
                state: preActionState,

            }), { onYield })
            .catch(error => console.error(error));
        };
    }
}
