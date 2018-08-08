
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { CircleProgress } from "../components/atoms/circle-progress";


const stories = storiesOf("Start Progress", module);

stories.addDecorator(withKnobs);

stories.addWithJSX("Loading...", () => {
    return <CircleProgress
        progress={number("Progress", 10)}
        error={boolean("Error", false)}
    />
});
