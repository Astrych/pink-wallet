
import styled from "styled-components";
import { Layout, Tabs } from "antd";


export const Content = styled(Layout.Content)`
    background-color: ${(props) => props.theme.primary};
    height: 100vh;
`;

export const TabsBar = styled(Tabs)`
    .ant-tabs-ink-bar {
        background-color: ${props => props.theme.primaryText};
        height: 3px;
    }
    .ant-tabs-tab {
        padding: 10px 0px 10px 0px;
        margin: 0;
        color: ${props => props.theme.icons};
    }

    .ant-tabs-tab-active, .ant-tabs-tab:hover {
        color: ${props => props.theme.primaryText};
        font-weight: 400;
    }
`;
