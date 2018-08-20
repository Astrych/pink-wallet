
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";

import SvgIcon from "@components/atoms/svg-icon";


storiesOf("SVG Icons", module)
.add("Minimzie", () => {
    return <SvgIcon name="minimize" size={number("Icon size", 24)} />
})
.add("Maximize", () => {
    return <SvgIcon name="maximize" size={number("Icon size", 24)} />
})
.add("Close", () => {
    return <SvgIcon name="close" size={number("Icon size", 24)} />
})
.add("Dashboard", () => {
    return <SvgIcon name="dashboard" size={number("Icon size", 24)} />
})
.add("Send", () => {
    return <SvgIcon name="send" size={number("Icon size", 24)} />
})
.add("Receive", () => {
    return <SvgIcon name="receive" size={number("Icon size", 24)} />
})
.add("Address Book", () => {
    return <SvgIcon name="addressBook" size={number("Icon size", 24)} />
})
.add("Side Stakes", () => {
    return <SvgIcon name="sideStakes" size={number("Icon size", 24)} />
})
.add("Transactions", () => {
    return <SvgIcon name="transactions" size={number("Icon size", 24)} />
})
.add("Messages", () => {
    return <SvgIcon name="messages" size={number("Icon size", 24)} />
})
.add("Settings", () => {
    return <SvgIcon name="settings" size={number("Icon size", 24)} />
})
.add("Search", () => {
    return <SvgIcon name="search" size={number("Icon size", 24)} />
});
