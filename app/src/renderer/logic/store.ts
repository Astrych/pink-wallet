
import {

    compose,
    createStore,
    applyMiddleware,

} from "redux";
import thunk from "redux-thunk";

import rootReducer, { State } from "./root-reducer";
import rootListeners from "./root-listeners";
import { go } from "./async-runner";


// Devtools store integration.
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

interface ListenerParams {
    action: string;
    dispatch: Function;
    state: State;
}

interface Listeners {
    [key: string]: (params: ListenerParams) => Promise<void>;
}

class SideEffects {

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
                        state
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
                state: preActionState

            }), { onYield })
            .catch(error => console.error(error));
        };
    }
}

const sideEffects = new SideEffects(rootListeners);

const enhancements = composeEnhancers(
    applyMiddleware(thunk, sideEffects.middleware()),
);

export default function configureStore() {

    const store = createStore(
        rootReducer,
        enhancements
    );

    // Will be removed by Webpack in production.
    if (process.env.NODE_ENV !== "production") {

        if (module.hot) {
            module.hot.accept("./root-reducer", async () => {
                const module = await import("./root-reducer");
                store.replaceReducer(module.default);
            });
            module.hot.accept("./root-listeners", async () => {
                const module = await import("./root-listeners");
                sideEffects.replaceListeners(module.default);
            });
        }
    }

    return store;
}
