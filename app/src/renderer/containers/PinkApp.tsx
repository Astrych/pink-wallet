
import React from "react";
import { hot } from "react-hot-loader";
import { Layout } from "antd";

import TitleBar from "./TitleBar";


const PinkApp = () => {

    return (
        <Layout>
            <TitleBar />
        </Layout>
    );
}

export default hot(module)(PinkApp);
