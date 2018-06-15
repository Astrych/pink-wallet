
import styled from "styled-components";
import { Layout, Row, Col } from "antd";


export const Header = styled(Layout.Header)`
    background-color: ${(props) => props.theme.primary};
    max-height: 35px;
    padding: 0;
`;

export const BarRow = styled(Row)`
    background-color: ${(props) => props.theme.primary};
    margin: 5px;
    height: 25px;
    -webkit-app-region: drag;
    user-select: none;
    line-height: 23px;
`;

export const LogoCol = styled(Col)`
    text-align: left;
`;

export const ButtonsCol = styled(Col)`
    text-align: right;
    > *:not(:last-child) {
        margin-right: 10px;
    }
`;

