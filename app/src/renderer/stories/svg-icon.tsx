
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import { createGlobalStyle } from "styled-components";

import SvgIcon from "@components/atoms/svg-icon";


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
    }
`;

const iconSize = 80;

storiesOf("SVG Icons", module)
.add("Minimzie", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="minimize" size={number("Icon size", iconSize)} />
    </>;
})
.add("Maximize", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="maximize" size={number("Icon size", iconSize)} />
    </>;
})
.add("Close", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="close" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard" size={number("Icon size", iconSize)} />
    </>;
})
.add("Send", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="send" size={number("Icon size", iconSize)} />
    </>;
})
.add("Receive", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="receive" size={number("Icon size", iconSize)} />
    </>
})
.add("Address Book", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="addressBook" size={number("Icon size", iconSize)} />
    </>;
})
.add("Side Stakes", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="sideStakes" size={number("Icon size", iconSize)} />
    </>;
})
.add("Transactions", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="transactions" size={number("Icon size", iconSize)} />
    </>;
})
.add("Messages", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="messages" size={number("Icon size", iconSize)} />
    </>;
})
.add("Settings", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="settings" size={number("Icon size", iconSize)} />
    </>;
})
.add("Search", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="search" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard deposit", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard-deposit" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard proof of stake", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard-proof-of-stake" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard rain cloud", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard-rain-cloud" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard received", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard-received" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard sent", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard-sent" size={number("Icon size", iconSize)} />
    </>;
})
.add("Dashboard withdraw", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="dashboard-withdraw" size={number("Icon size", iconSize)} />
    </>;
})
.add("Send address book", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="send-address-book" size={number("Icon size", iconSize)} />
    </>;
})
.add("Send copy", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="send-copy" size={number("Icon size", iconSize)} />
    </>;
})
.add("Receive copy address", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="receive-copy-address" size={number("Icon size", iconSize)} />
    </>;
})
.add("Receive new address", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="receive-new-address" size={number("Icon size", iconSize)} />
    </>;
})
.add("Receive qr code", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="receive-qr-code" size={number("Icon size", iconSize)} />
    </>;
})
.add("Receive sign message", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="receive-sign-message" size={number("Icon size", iconSize)} />
    </>;
})
.add("Receive verify message", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="receive-verify-message" size={number("Icon size", iconSize)} />
    </>;
})
.add("Address book copy address", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="address-book-copy-address" size={number("Icon size", iconSize)} />
    </>;
})
.add("Address book delete entry", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="address-book-delete-entry" size={number("Icon size", iconSize)} />
    </>;
})
.add("Address book new entry", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="address-book-new-entry" size={number("Icon size", iconSize)} />
    </>;
})
.add("Address book qr code", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="address-book-qr-code" size={number("Icon size", iconSize)} />
    </>;
})
.add("Address book verify message", () => {
    return <>
        <GlobalStyle />
        <SvgIcon name="address-book-verify-message" size={number("Icon size", iconSize)} />
    </>;
});
