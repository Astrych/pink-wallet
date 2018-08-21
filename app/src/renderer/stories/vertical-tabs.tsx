
import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs";
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
`;

stories.add("Tabs bar", () => {
    const options = ["dark", "light", "default"];
    const selectedTheme = select("Themes", options, "default");
    const theme = themes[selectedTheme];

    const tabOptions = [
        "dashboad",
        "send",
        "receive",
        "addressBook",
        "sideStakes",
        "transactions",
        "messages",
    ];
    const selectedTab = select("Tabs", tabOptions, "dashboard");

    return(
        <ThemeProvider theme={theme ? theme : themes.default}>
            <Container>
                <VerticalTabs
                    width={number("Bar width", 125)}
                    tabSize={number("Tab size", 65)}
                    defaultTab={selectedTab}
                    extraButton={<MenuButton name="settings" />}
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
