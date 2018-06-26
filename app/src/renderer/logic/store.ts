
import {

    compose,
    createStore,
    applyMiddleware,

} from "redux";
import thunk from "redux-thunk";

import rootReducer, { State } from "./root-reducer";
import rootListeners from "./root-listeners";


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

    constructor(...listeners: Listeners[]) {
        this.listeners = listeners;
    }

    replaceListeners(...listeners: Listeners[]) {
        this.listeners = listeners;
    }

    middleware() {

        return store => next => action => {
            const preActionState = store.getState();
            next(action);

            // https://sdgluck.github.io/2015/08/29/request-idle-callback/#[2]
            // new Promise((resolve, reject) => {
            //     requestIdleCallback(nextListener);
            //     function nextListener(deadline) {
                    // if(deadline.timeRemaining <= 0) {
                    //     requestIdleCallback(nextListener);
                    //     return;
                    // }
            //     }
            // });

            requestIdleCallback(() => {

                this.listeners.forEach(listener => {
                    if (listener[action.type]) {

                        listener[action.type]({

                            action,
                            dispatch: store.dispatch,
                            state: preActionState

                        })
                        .catch(err => {
                            console.log(`Uncaught error in listener [${action.type}]!`);
                            console.error(err);
                        });
                    }
                });
            }, { timeout: 200 });
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
            module.hot.accept("./root-reducer", () => {
                import("./root-reducer")
                .then(newRootReducer => {
                    store.replaceReducer(newRootReducer.default);
                });
            });
            module.hot.accept("./root-listeners", () => {
                import("./root-listeners")
                .then(newRootListeners => {
                    sideEffects.replaceListeners(
                        newRootListeners.default
                    );
                });
            });
        }
    }

    return store;
}
