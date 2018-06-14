
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";

import AppBar from "./app-bar";
import { State } from "../logic/root-reducer";

import { getD4LData } from "../logic/d4l-api";


getD4LData().then((res) => console.log(res));

function mapStateToProps(state: State) {

    return {
        theme: state.settings.theme
    };
}

interface Props {
    theme
}

class PinkApp extends Component<Props> {

    render() {
        const { theme } = this.props;
        return (
            <ThemeProvider theme={{theme}}>
                <BrowserRouter>
                    <Layout>
                        <AppBar />
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default hot(module)(
    connect(
        mapStateToProps
    )(
        PinkApp
    )
);
