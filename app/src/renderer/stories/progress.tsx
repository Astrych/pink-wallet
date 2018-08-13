
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number } from "@storybook/addon-knobs";
import styled from "styled-components";

import { CircleProgress } from "@components/atoms/circle-progress";


const stories = storiesOf("Progress components", module);

const Font = styled.div`
    @font-face {
        font-family: "Roboto";
        src: url("fonts/Roboto-Regular.ttf");
    }
    font-family: "Roboto";
`;

stories.add("CircleProgress", () => {
    return (
        <Font>
            <CircleProgress
                progress={number("Progress", 10)}
                error={boolean("Error", false)}
                stages={4}
            />
        </Font>
    );
});
