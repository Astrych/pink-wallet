
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { Provider } from "react-redux";
import "./locales";

import configureStore from "./logic/store";
import PinkApp from "./components/pink-app";


// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

injectGlobal`
    html, body {
        height: auto;
        box-sizing: border-box;
        -webkit-app-region: no-drag;
        user-select: none;
    }
    body {
        margin: 0;
        background-color: transparent;
        overflow: hidden;
    }
    img {
        border-style: none;
    }
    div#app {
        height: auto;
    }
`;

const store = configureStore();

ReactDOM.render(

    <Provider store={store}>
        <PinkApp />
    </Provider>,
    document.getElementById("app")
);
