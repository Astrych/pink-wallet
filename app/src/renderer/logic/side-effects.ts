
import { Dispatch, Middleware, MiddlewareAPI } from "redux";

import { AppState } from "./root-reducer";
import { Actions } from "./root-actions";
import { go } from "./async-runner";


export interface EffectMiddleware<S, D extends Dispatch> extends Middleware<{}, S, D> {
  (api: MiddlewareAPI<D, S>): (next: Dispatch<Actions>) => (action: Actions) => void
}

export interface ListenerParams {
    action: Actions;
    dispatch: Dispatch<Actions>;
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

    middleware(): EffectMiddleware<AppState, Dispatch<Actions>> {

        function* callListeners(
            listeners: Listeners[],
            { action, dispatch, state }: ListenerParams,
        ) {
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

        return (api: MiddlewareAPI<Dispatch<Actions>, AppState>) =>
               (next: Dispatch<Actions>) => (action: Actions) => {

            const preActionState = api.getState();
            next(action);

            const onYield = (ret: any) => console.debug("ACTION LISTENER: SIDE EFFECTS", ret);

            go(callListeners(this.listeners, {
                action,
                dispatch: api.dispatch,
                state: preActionState,
            }),
                { onYield }
            )
            .catch(error => console.error(error));
        };
    }
}
