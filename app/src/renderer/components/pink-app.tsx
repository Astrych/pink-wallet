
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";

import { AppLayout } from "./app-content/layout";
import AppHeader from "./app-header";
import AppContent from "./app-content";
import { State } from "../logic/root-reducer";
import themes from "../themes";


function mapStateToProps(state: State) {

    return {
        currentTheme: state.settings.currentTheme
    };
}

interface PinkAppProps {
    currentTheme
}

class PinkApp extends Component<PinkAppProps> {

    render() {
        const theme = themes[this.props.currentTheme];
        return (
            <ThemeProvider theme={theme ? theme : themes["default"]}>
                <AppLayout>
                    <AppHeader />
                    <AppContent />
                </AppLayout>
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
