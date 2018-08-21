
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number } from "@storybook/addon-knobs";
import styled from "styled-components";

import { CircleProgress } from "@components/atoms/circle-progress";


const stories = storiesOf("Progress components", module);

const Container = styled.div`
    font-family: "Open Sans";
    margin: auto;
`;

stories.add("CircleProgress", () => {
    return (
        <Container>
            <CircleProgress
                progress={number("Progress", 10)}
                error={boolean("Error", false)}
                stages={4}
            />
        </Container>
    );
});
