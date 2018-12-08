
import React, { Component } from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs";
import {

    MemoryRouter,
    withRouter,
    RouteComponentProps,

} from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import VerticalTabs from "@components/atoms/vertical-tabs";
import Tab from "@components/atoms/tab";
import MenuButton from "@components/atoms/menu-button";
import themes from "@view-logic/theme";


const stories = storiesOf("Vertical Tabs", module);

const Container = styled.div`
    font-family: "Open Sans";
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    --tabs-bar-width: 125px;
`;

const View = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: yellow;
`;

stories.add("Only tabs bar", () => {
    const options = ["dark", "light", "default"];
    const selectedTheme = select("Themes", options, "default");
    const theme = themes[selectedTheme];

    return(
        <ThemeProvider theme={theme ? theme : themes.default}>
            <Container>
                <div id="tooltips"></div>
                <VerticalTabs
                    tabSize={number("Tab size", 65)}
                    defaultTab="dashboad"
                    extraButton={<MenuButton name="settings" description="Settings" />}
                    tabsAction={
                        selectedTab => {
                            console.log("TAB CHANGED:", selectedTab);
                        }
                    }
                >
                    <Tab name="dashboard" description="Dasboard" />
                    <Tab name="send" description="Send" />
                    <Tab name="receive" description="Receive" />
                    <Tab name="addressBook" description="Address Book" />
                    <Tab name="sideStakes" description="Side Stakes" />
                    <Tab name="transactions" description="Transactions" />
                    <Tab name="messages" description="Messages" />
                </VerticalTabs>
            </Container>
        </ThemeProvider>
    );
});

interface ViewSwitcherProps extends RouteComponentProps<any> {}
interface ViewSwitcherState {
    route: string;
}

class ViewSwitcherTest extends Component<ViewSwitcherProps & RouteComponentProps, ViewSwitcherState> {

    private redirect = (route: string) => {
        const { location, history } = this.props;

        if (route !== location.pathname) {
            console.log(route, location);
            history.push(route);
        }
    };

    render() {

        return(
            <VerticalTabs
                tabSize={number("Tab size", 65)}
                defaultTab="dashboad"
                extraButton={<MenuButton name="settings" description="Settings" />}
                tabsAction={
                    selectedTab => {
                        console.log("TAB CHANGED:", selectedTab);
                        this.redirect(`/${selectedTab}`);
                    }
                }
            >
                <Tab name="dashboard" description="Dasboard" />
                <Tab name="send" description="Send" />
                <Tab name="receive" description="Receive" />
                <Tab name="addressBook" description="Address Book" />
                <Tab name="sideStakes" description="Side Stakes" />
                <Tab name="transactions" description="Transactions" />
                <Tab name="messages" description="Messages" />
            </VerticalTabs>
        );
    }
}

const ViewSwitcher = withRouter(ViewSwitcherTest);

stories.add("Tabs bar with chaning view", () => {
    const options = ["dark", "light", "default"];
    const selectedTheme = select("Themes", options, "default");
    const theme = themes[selectedTheme];

    return(
        <ThemeProvider theme={theme ? theme : themes.default}>
            <Container>
                <div id="tooltips"></div>
                <MemoryRouter>
                    <>
                        <ViewSwitcher />
                        <View>
                            <Switch>
                                <Route
                                    exact
                                    path="/dashboard"
                                    render={() => <h1>Dashboard</h1>}
                                />
                                <Route
                                    exact
                                    path="/send"
                                    render={() => <h1>Send</h1>}
                                />
                                <Route
                                    exact
                                    path="/receive"
                                    render={() => <h1>Receive</h1>}
                                />
                                <Route
                                    exact
                                    path="/addressBook"
                                    render={() => <h1>Address Book</h1>}
                                />
                                <Route
                                    exact
                                    path="/sideStakes"
                                    render={() => <h1>Side Stakes</h1>}
                                />
                                <Route
                                    exact
                                    path="/transactions"
                                    render={() => <h1>Transactions</h1>}
                                />
                                <Route
                                    exact
                                    path="/messages"
                                    render={() => <h1>Messages</h1>}
                                />
                                <Redirect exact from="/" to="/dashboard" />
                            </Switch>
                        </View>
                    </>
                </MemoryRouter>
            </Container>
        </ThemeProvider>
    );
});
