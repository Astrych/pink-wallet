
import styled from "styled-components";
import { Layout, Tabs } from "antd";


export const AppLayout = styled(Layout)`
    height: 100vh;
`;

export const Content = styled(Layout.Content)`
    background-color: ${props => props.theme.primary};
`;

export const TabsBar = styled(Tabs)`
    color: ${props => props.theme.tabs.icons};
    height: calc(100vh - var(--title-bar-height));
    .ant-tabs-bar[role=tablist] {
        background-color: ${props => props.theme.secondary};
        border-right: none;
        display: flex;
        flex-direction: column;
    }
    .ant-tabs-ink-bar {
        background-color: ${props => props.theme.primaryText};
    }
    .ant-tabs-bar .ant-tabs-tab {
        padding: 0;
        margin: 0;
        text-align: center;
        transition: none;
        > a {
            display: flex;
            align-items: center;
            color: inherit;
            text-decoration: none;
            transition: none;
            text-align: center;
            -webkit-user-drag: none;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
        }
    }
    .ant-tabs-tab:hover,
    .ant-tabs-tab-active {
        color: ${props => props.theme.primaryText};
    }
    .ant-tabs-tab:hover {
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .ant-tabs-nav-container {
        margin-top: 39px;
    }
    .ant-tabs-tab-prev {
        left: -1px;
    }
    .ant-tabs-tab-next {
        right: 1px;
    }
    .ant-tabs-tab-prev,
    .ant-tabs-tab-next {
        background-color: ${props => props.theme.tabs.scrolls};
        color: inherit;
        :hover {
            color: ${props => props.theme.primaryText};
        }
        &.ant-tabs-tab-btn-disabled {
            color: rgba(0, 0, 0, 0.25);
            :hover {
                color: rgba(0, 0, 0, 0.25);
            }
        }
    }
    .ant-tabs-content {
        height: 100%;
        border-left: none;
    }
    .ant-tabs-tabpane {
        height: inherit;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            ". a a ."
            ". a a .";
    }
    /* .ant-tabs-tabpane-inactive {
        height: inherit !important;
    } */
`;
