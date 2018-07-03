
import styled from "styled-components";
import { Layout, Tabs } from "antd";


export const AppLayout = styled(Layout)`
    height: 100vh;
`;

export const Content = styled(Layout.Content)`
    background-color: ${props => props.theme.content.primary};
`;

export const TabsBar = styled(Tabs)`
    color: ${props => props.theme.tabs.icons};
    height: calc(100vh - var(--title-bar-height));
    .ant-tabs-bar[role=tablist] {
        background-color: ${props => props.theme.content.secondary};
        border-right: none;
        display: flex;
        flex-direction: column;
    }
    .ant-tabs-ink-bar {
        background-color: ${props => props.theme.text.primary};
    }
    .ant-tabs-bar .ant-tabs-tab {
        width: calc(var(--tabs--bar-width) + 2px);
        padding: 0;
        margin: 0;
        text-align: center;
        transition: none;
        > a {
            display: flex;
            align-items: center;
            padding: 18px 50px 18px 50px;
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
        color: ${props => props.theme.text.primary};
    }
    .ant-tabs-tab:hover {
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .ant-tabs-nav-container {
        margin-top: 32px;
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
        transition: none;
        :hover {
            color: ${props => props.theme.text.primary};
            transition: width 0.3s
                        cubic-bezier(0.645, 0.045, 0.355, 1),
                        opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
                        color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        &.ant-tabs-tab-btn-disabled {
            color: rgba(0, 0, 0, 0.25);
            :hover {
                color: rgba(0, 0, 0, 0.25);
            }
        }
    }
    .ant-tabs-tab-prev-icon {
        margin-top: 2px;
    }
    .ant-tabs-tab-prev-icon:before,
    .ant-tabs-tab-next-icon:before {
        font-size: 18px;
    }
    .ant-tabs-extra-content {
        > button {
            padding: 18px 50px 18px 50px;
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
