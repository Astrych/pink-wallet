
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number } from "@storybook/addon-knobs";
import { createGlobalStyle } from "styled-components";

import CircleProgress from "@components/atoms/circle-progress";


const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
        box-sizing: border-box;
        margin: 0;
    }
    div#root {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Open Sans";
    }
`;

const stories = storiesOf("Progress components", module);

stories.add("CircleProgress", () => {
    return <>
        <GlobalStyle />
        <CircleProgress
            progress={number("Progress", 10)}
            error={boolean("Error", false)}
            stages={4}
        />
    </>;
});
