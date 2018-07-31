
import React from "react";
import { storiesOf } from "@storybook/react";

import SvgIcon from "../components/atoms/svg-icon";


storiesOf("SVG Icons", module)
.addWithJSX("Minimzie", () => {
    return <SvgIcon name="minimize" size={24} />
})
.addWithJSX("Maximize", () => {
    return <SvgIcon name="maximize" size={24} />
})
.addWithJSX("Close", () => {
    return <SvgIcon name="close" size={24} />
})
.addWithJSX("Dashboard", () => {
    return <SvgIcon name="dashboard" size={24} />
})
.addWithJSX("Send", () => {
    return <SvgIcon name="send" size={24} />
})
.addWithJSX("Receive", () => {
    return <SvgIcon name="receive" size={24} />
})
.addWithJSX("Address Book", () => {
    return <SvgIcon name="addressBook" size={24} />
})
.addWithJSX("Side Stakes", () => {
    return <SvgIcon name="sideStakes" size={24} />
})
.addWithJSX("Transactions", () => {
    return <SvgIcon name="transactions" size={24} />
})
.addWithJSX("Messages", () => {
    return <SvgIcon name="messages" size={24} />
})
.addWithJSX("Settings", () => {
    return <SvgIcon name="settings" size={24} />
})
.addWithJSX("Search", () => {
    return <SvgIcon name="search" size={24} />
});
