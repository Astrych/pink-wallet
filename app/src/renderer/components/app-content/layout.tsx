
import styled from "styled-components";
import { Layout, Tabs } from "antd";


export const AppLayout = styled(Layout)`
    height: 100vh;
`;

export const Content = styled(Layout.Content)`
    background-color: ${(props) => props.theme.primary};
`;

export const TabsBar = styled(Tabs)`
    width: 100%;
    height: calc(100vh - var(--title-bar-height));
    display: flex;
    flex-direction: column;
    .ant-tabs-bar {
        border-bottom: none;
        margin-top: 16px;
        margin-bottom: 16px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .ant-tabs-ink-bar {
        background-color: ${props => props.theme.primaryText};
    }
    .ant-tabs-tab {
        color: ${props => props.theme.tabsIcons};
        padding: 10px 10px 10px 10px;
        margin: 0;
        transition: none;
    }

    .ant-tabs-tab:hover, .ant-tabs-tab-active {
        color: ${props => props.theme.primaryText};
        font-weight: 400;
    }

    .ant-tabs-tab:hover {
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .ant-tabs-nav {
        float: right;
    }
    .ant-tabs-extra-content {
        float: left !important;
        line-height: 65px;
    }
    .ant-tabs-content {
        flex: 1;
    }
    .ant-tabs-tabpane {
        background-color: ${props => props.theme.secondary};
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            ". a a ."
            ". a a .";
    }
    .ant-tabs-tabpane-inactive {
        height: inherit !important;
    }
`;
