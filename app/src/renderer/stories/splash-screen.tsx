
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number, text } from "@storybook/addon-knobs";
import styled, { injectGlobal } from "styled-components";

import SplashImg from "@components/splash/image";
import SplashProgress from "@components/splash/progress";
import Message from "@components/splash/message";


const stories = storiesOf("Splash Screen", module);

injectGlobal`
    @font-face {
        font-family: "Roboto";
        src: url("fonts/Roboto-Regular.woff2");
    }
    html, body {
        user-select: none;
        height: 100%;
        box-sizing: border-box;
        font-family: "Roboto";
    }
    body {
        margin: 0;
    }
    img {
        border-style: none;
    }
    div#root {
        height: 100%;
        display: flex;
        overflow: hidden;
        position: relative;
    }
`;

const SplashWindow = styled.div`
    margin: auto;
    position: relative;
    width: 615px;
    height: 656px;
`;

stories.add("Components layout", () => {
    const show = boolean("Show", true);
    return(
        <SplashWindow>
            <SplashImg animate={show} />
            {show && <Message>{text("Message", "Initialising...")}</Message>}
            {
                show &&
                <SplashProgress
                    progress={number("Progress", 10)}
                    error={boolean("Error", false)}
                    stages={number("Stages", 0)}
                />
            }
        </SplashWindow>
    );
});
