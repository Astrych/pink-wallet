/**
 * Redux store creator.
 * @module store
 */

import {

    createStore,
    applyMiddleware,
    compose

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

    // if (process.env.NODE_ENV !== "production") {

    //     if ((module as any).hot) {

    //         (module as any).hot.accept("./root-reducer", () => {
    //             import("./root-reducer")
    //             .then(rootReducer => {
    //                 console.log(rootReducer);
    //                 // store.replaceReducer(rootReducer)
    //             });
    //         });
    //     }
    // }

    return store;
}
