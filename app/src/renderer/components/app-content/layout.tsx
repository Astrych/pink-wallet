
import styled from "styled-components";
import { Layout, Tabs } from "antd";


export const Content = styled(Layout.Content)`
    background-color: ${(props) => props.theme.primary};
    height: 100vh;
`;

export const TabBar = styled(Tabs)`
    .ant-tabs-ink-bar {
        background-color: ${props => props.theme.mainText};
        height: 3px;
    }
`;
