
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

import ComboBox from "@components/atoms/combo-box";
import themes from "@view-logic/theme";


const stories = storiesOf("Dropdown lists", module);

const Container = styled.div`
    font-family: "Open Sans";
    margin: auto;
`;

stories.add("ComboBox", () => {

    const options = ["dark", "light", "default"];
    const selectedTheme = select("Themes", options, "default");
    const theme = themes[selectedTheme];

    const list = [
        { id: 1, title: "English", selected: false, value: "en" },
        { id: 2, title: "Polski", selected: false, value: "pl" },
    ];

    const headerTitle = "Select language...";

    function toggleSelected(id: number) {
        list.forEach(o => {
            if (o.id === id) {
                console.log("Selected:", o.title);
            }
        });
    }

    return (
        <ThemeProvider theme={theme ? theme : themes.default}>
            <Container>
                <ComboBox
                    list={list}
                    action={toggleSelected}
                    placeholder={headerTitle}
                    minWidth={220}
                />
            </Container>
        </ThemeProvider>
    );
});
