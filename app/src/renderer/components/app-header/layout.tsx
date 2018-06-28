
import styled from "styled-components";
import { Layout, Row } from "antd";


export const Header = styled(Layout.Header)`
    background-color: ${props => props.theme.primary};
    max-height: var(--title-bar-height);
    padding: 0;
`;

export const BarRow = styled(Row)`
    -webkit-app-region: drag;
    user-select: none;
    --bar-row-margin: 5px;
    margin: var(--bar-row-margin) var(--bar-row-margin) 0px 0px;
    height: calc(var(--title-bar-height) - var(--bar-row-margin));
    line-height: 11px;
    > *:not(:last-child) {
        margin-right: 10px;
    }
`;

export const Filler = styled.div`
    height: var(--title-bar-height);
    width: 131px;
    background-color: ${props => props.theme.secondary};
    float: left;
    background-image: url("img/logo-shadow.png");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;
`;
