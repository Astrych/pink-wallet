
import React from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "antd";

import AppBar from "./app-bar";


const mapStateToProps = state => {

    return {
        theme: state.settings.theme
    };
};

interface PinkAppProps {
    theme
}

class PinkApp extends React.Component<PinkAppProps> {

    render() {
        const theme = this.props.theme;
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

const PinkAppWithStore = connect(mapStateToProps)(PinkApp);
export default hot(module)(PinkAppWithStore);
