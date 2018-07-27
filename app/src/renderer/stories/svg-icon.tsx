
import React from "react";
import { storiesOf } from "@storybook/react";

import SvgIcon from "../components/atoms/svg-icon";


const stories = storiesOf("SVG Icons", module);

stories.addWithJSX("test", () => {

    return <>
        <SvgIcon name="minimize" size={24} />
        <SvgIcon name="maximize" size={24} />
        <SvgIcon name="close"    size={24} />

        <SvgIcon name="dashboard"    size={24} />
        <SvgIcon name="send"         size={24} />
        <SvgIcon name="receive"      size={24} />
        <SvgIcon name="addressBook"  size={24} />
        <SvgIcon name="sideStakes"   size={24} />
        <SvgIcon name="transactions" size={24} />
        <SvgIcon name="messages"     size={24} />
        <SvgIcon name="settings"     size={24} />
        <SvgIcon name="search"       size={24} />
    </>
});
