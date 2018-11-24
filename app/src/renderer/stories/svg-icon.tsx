
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
})
.add("Dashboard deposit", () => {
    return <SvgIcon name="dashboard-deposit" size={number("Icon size", 24)} />
})
.add("Dashboard proof of stake", () => {
    return <SvgIcon name="dashboard-proof-of-stake" size={number("Icon size", 24)} />
})
.add("Dashboard rain cloud", () => {
    return <SvgIcon name="dashboard-rain-cloud" size={number("Icon size", 24)} />
})
.add("Dashboard received", () => {
    return <SvgIcon name="dashboard-received" size={number("Icon size", 24)} />
})
.add("Dashboard sent", () => {
    return <SvgIcon name="dashboard-sent" size={number("Icon size", 24)} />
})
.add("Dashboard withdraw", () => {
    return <SvgIcon name="dashboard-withdraw" size={number("Icon size", 24)} />
})
.add("Send address book", () => {
    return <SvgIcon name="send-address-book" size={number("Icon size", 24)} />
})
.add("Send copy", () => {
    return <SvgIcon name="send-copy" size={number("Icon size", 24)} />
})
.add("Receive copy address", () => {
    return <SvgIcon name="receive-copy-address" size={number("Icon size", 24)} />
})
.add("Receive new address", () => {
    return <SvgIcon name="receive-new-address" size={number("Icon size", 24)} />
})
.add("Receive qr code", () => {
    return <SvgIcon name="receive-qr-code" size={number("Icon size", 24)} />
})
.add("Receive sign message", () => {
    return <SvgIcon name="receive-sign-message" size={number("Icon size", 24)} />
})
.add("Receive verify message", () => {
    return <SvgIcon name="receive-verify-message" size={number("Icon size", 24)} />
})
.add("Address book copy address", () => {
    return <SvgIcon name="address-book-copy-address" size={number("Icon size", 24)} />
})
.add("Address book delete entry", () => {
    return <SvgIcon name="address-book-delete-entry" size={number("Icon size", 24)} />
})
.add("Address book new entry", () => {
    return <SvgIcon name="address-book-new-entry" size={number("Icon size", 24)} />
})
.add("Address book qr code", () => {
    return <SvgIcon name="address-book-qr-code" size={number("Icon size", 24)} />
})
.add("Address book verify message", () => {
    return <SvgIcon name="address-book-verify-message" size={number("Icon size", 24)} />
});
