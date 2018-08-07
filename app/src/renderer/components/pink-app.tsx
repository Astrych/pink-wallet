
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";

import { AppLayout } from "./app-layout";
import AppHeader from "./header";
import AppContent from "./content";
import themes from "../themes";
import { AppState } from "@logic/root-reducer";


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

function mapStateToProps(state: AppState) {

    return {
        currentTheme: state.settings.currentTheme
    };
}

export default hot(module)(
    connect(
        mapStateToProps
    )(
        PinkApp
    )
);
