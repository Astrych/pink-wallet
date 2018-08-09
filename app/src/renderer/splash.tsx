
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import SplashScreen from "@components/splash-screen";
import FontRoboto from "@assets/fonts/Roboto-Regular.ttf";


// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

injectGlobal`
    @font-face {
        font-family: "Roboto";
        src: url(${FontRoboto});
    }
    html, body {
        user-select: none;
        height: 100%;
        box-sizing: border-box;
        font-family: "Roboto";
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
        display: flex;
        overflow: hidden;
    }
`;

ReactDOM.render(

    <SplashScreen />,
    document.getElementById("app")
);
