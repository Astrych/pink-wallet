
import styled from "styled-components";
import { Layout, Row } from "antd";


export const Header = styled(Layout.Header)`
    max-height: var(--title-bar-height);
    background-color: ${props => props.theme.header.bar};
    padding: 0;
`;

export const DragBar = styled(Row)`
    --bar-row-margin: 5px;
    -webkit-app-region: drag;
    user-select: none;
    margin: var(--bar-row-margin) var(--bar-row-margin) 0px var(--bar-row-margin);
    height: calc(var(--title-bar-height) - var(--bar-row-margin));
    line-height: 11px;
    > button:not(:last-child) {
        margin-right: 10px;
    }
`;
