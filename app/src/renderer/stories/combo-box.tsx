
import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

import ComboBox from "@components/atoms/combo-box";


const stories = storiesOf("Dropdown lists", module);

const Container = styled.div`
    font-family: "Open Sans";
    margin: auto;
`;

stories.add("ComboBox", () => {

    const list = [
        { id: 1, title: "English", selected: false, key: "en" },
        { id: 2, title: "Polski", selected: false, key: "pl" },
    ];

    let headerTitle = "Select language...";

    function toggleSelected(id: number) {
        list.forEach(o => {
            if (o.id === id) {
                console.log("Selected:", o.title);
            }
        });
    }

    return (
        <Container>
            <ComboBox list={list} action={toggleSelected} headerTitle={headerTitle} />
        </Container>
    );
});
