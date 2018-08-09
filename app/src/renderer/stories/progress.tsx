
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import styled from "styled-components";

import { CircleProgress } from "../components/atoms/circle-progress";


const stories = storiesOf("Start Progress", module);

stories.addDecorator(withKnobs);

const Container = styled.div`
    @font-face {
        font-family: "Roboto";
        src: url("fonts/Roboto-Regular.ttf");
    }
    background-color: pink;
    font-family: "Roboto";
`;

stories.addWithJSX("Loading...", () => {
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
