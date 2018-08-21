
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import SplashScreen from "@components/splash-screen";

import "@view-utils/locales";

// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

injectGlobal`
    html, body {
        user-select: none;
        height: 100%;
        box-sizing: border-box;
        font-family: "Open Sans";
    }
    body {
        margin: 0;
        background: transparent;
    }
    img {
        border-style: none;
    }
    div#app {
        height: 100%;
        position: relative;
        display: flex;
        overflow: hidden;
    }
`;

ReactDOM.render(

    <SplashScreen />,
    document.getElementById("app")
);
