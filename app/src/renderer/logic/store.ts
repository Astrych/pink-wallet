/**
 * Redux store creator.
 * @module store
 */

import {

    compose,
    createStore,
    applyMiddleware,

} from "redux";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";


// Devtools store integration.
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
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
        }
    }

    return store;
}
