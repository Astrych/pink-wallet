
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";
import { Provider as StoreProvider } from "react-redux";

import configureStore from "./logic/store";
import PinkApp from "./components/pink-app";


// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

injectGlobal`
    html, body {
        height: 100%;
        box-sizing: border-box;
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
        height: 100%;
        --title-bar-height: 35px;
    }
`;

const store = configureStore();

ReactDOM.render(

    <StoreProvider store={store}>
        <PinkApp />
    </StoreProvider>,
    document.getElementById("app")
);
