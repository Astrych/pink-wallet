
import {

    compose,
    createStore,
    applyMiddleware,

} from "redux";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";
import listeners from "./side-effects";


// Devtools store integration.
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


class SideEffects {

    private listeners: object[];

    constructor(...listeners: object[]) {
        this.listeners = listeners;
    }

    replaceListeners(...listeners: object[]) {
        this.listeners = listeners;
    }

    middleware() {

        return store => next => action => {
            const preActionState = store.getState();
            next(action);

            setTimeout(() => {

                this.listeners.forEach(listener => {
                    if (listener[action.type]) {
                        listener[action.type]({
                            action,
                            dispatch: store.dispatch,
                            state: preActionState
                        });
                    }
                });
            });
        };
    }
}

const sideEffects = new SideEffects(listeners);

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
            module.hot.accept("./side-effects", () => {
                import("./side-effects")
                .then(newListeners => {
                    sideEffects.replaceListeners(
                        newListeners.default
                    );
                });
            });
        }
    }

    return store;
}
