
import { remote } from "electron";
import React from "react";
import ReactDOM from "react-dom";

import SplashScreen from "./components/SplashScreen";


// Inherits env vars from main process
// (fix bad Linux behaviour in that regard).
process.env = remote.process.env;

ReactDOM.render(

    <SplashScreen />,
    document.getElementById("app")
);
