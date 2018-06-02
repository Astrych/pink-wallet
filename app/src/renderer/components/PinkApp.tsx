
import React from "react";
import { hot } from "react-hot-loader";
import styled, { injectGlobal } from "styled-components";
import { Layout } from "antd";

import TitleBar from "./TitleBar";


injectGlobal`
    html, body {
        height: 100%;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        background-color: #eb78ab;
        overflow: hidden;
    }
    img {
        border-style: none;
    }
    div#app {
        height: 100%;
    }
`;

const PinkApp = () => {

    return (
        <Layout>
            <TitleBar />
        </Layout>
    );
}

export default hot(module)(PinkApp);
