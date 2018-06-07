
import styled from "styled-components";
import { Layout, Row, Col } from "antd";


export const AppHeader = styled(Layout.Header)`
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

