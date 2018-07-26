
import React from "react";
import { storiesOf } from "@storybook/react";

import SvgIcon from "../components/atoms/svg-icon";


const stories = storiesOf("Progress", module);

stories.add("test", () => {
    return <SvgIcon name="test" size={12} />
});
