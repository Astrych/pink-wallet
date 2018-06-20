
import styled from "styled-components";
import { Layout, Row } from "antd";


export const Header = styled(Layout.Header)`
    background-color: ${(props) => props.theme.primary};
    max-height: 35px;
    padding: 0;
`;

export const BarRow = styled(Row)`
    -webkit-app-region: drag;
    user-select: none;
    height: 30px;
    margin: 5px 5px 0px 5px;
    line-height: 11px;
    > *:not(:last-child) {
        margin-right: 10px;
    }
`;
