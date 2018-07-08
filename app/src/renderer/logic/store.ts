
import {

    compose,
    createStore,
    applyMiddleware,

} from "redux";
import thunk from "redux-thunk";

import { SideEffects } from "./side-effects";
import rootListeners from "./root-listeners";
import rootReducer from "./root-reducer";


// Devtools store integration.
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


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
