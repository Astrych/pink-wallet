
import React from "react";
import styled from "styled-components";
import { Layout, Row, Col } from "antd";


export const AppBar = styled(Layout.Header)`
    background-color: black;
    max-height: 35px;
    padding: 0;
`;

export const BarRow = styled(Row)`
    background-color: black;
    margin: 5px;
    height: 25px;
    -webkit-app-region: drag;
    user-select: none;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 23px;
`;

export const LogoCol = styled(Col)`
    text-align: left;
`;

export const TitleCol = styled(Col)`
    text-align: center;
`;

export const ButtonsCol = styled(Col)`
    text-align: right;
    > *:not(:last-child) {
        margin-right: 10px;
    }
`;

export const PinkIcon = styled.img`
    height: 25px;
    vertical-align: baseline;
`;
