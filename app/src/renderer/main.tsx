
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";

import configureStore from "@view-logic/store";
import PinkApp from "@components/pink-app";

import "@view-utils/locales";


// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        box-sizing: border-box;
        font-family: "Open Sans";
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
        --tabs-bar-width: 125px;
    }
`;

const store = configureStore();

ReactDOM.render(
    <>
        <GlobalStyle />
        <Provider store={store}>
            <PinkApp />
        </Provider>
    </>,
    document.getElementById("app")
);
