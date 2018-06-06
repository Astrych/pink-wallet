
import React from "react";
import { hot } from "react-hot-loader";
import { Layout } from "antd";

import AppBar from "./app-bar";


const PinkApp = () => {

    return (
        <Layout>
            <AppBar />
        </Layout>
    );
}

export default hot(module)(PinkApp);
