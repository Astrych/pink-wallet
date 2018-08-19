
import React, { Component, ReactElement } from "react";

import { styled } from "@view-utils/styles";
import Tab, { TabContent, TabProps } from "./tab";


const Underline = styled.div`
    position: absolute;
    right: 0;
    border-width: 0px 1px 0px 1px;
    border-style: solid;
    border-color: ${props => props.theme.text.primary};
    transition: top 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), left 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), color 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), width 0.3s
                cubic-bezier(0.35, 0, 0.25, 1);
    will-change: top, left, width, color;
`;

const TabsBar = styled.div<{ width: number, tabSize: number }>`
    position: relative;
    color: ${props => props.theme.tabs.icons};
    background-color: ${props => props.theme.content.secondary};
    width: ${props => props.width}px;
    height: 100%;
    margin-left: 0;

    ${TabContent}, ${Underline} {
        height: ${props => props.tabSize}px;
    }
`;

interface VerticalTabsProps {
    width: number;
    tabSize: number;
    selected: number;
    children: ReactElement<Tab>[];
}

class VerticalTabs extends Component<VerticalTabsProps> {

    state = { activeIndex: 0 };

    static defaultProps = {
        width: 125,
        tabSize: 45,
        selected: 0,
    }

    onClick = (index?: number) => {
        if (index !== this.state.activeIndex) {
            console.log("CLICK TAB!", index);
            this.setState({ activeIndex: index });
        }
    };

    render() {
        const { width, tabSize, selected, children } = this.props;
        let position = this.state.activeIndex*tabSize;

        return (
            <TabsBar width={width} tabSize={tabSize}>
                {
                    React.Children.map(children, (child, index) => {
                        const props = (child as ReactElement<TabProps>).props;
                        return React.cloneElement(child as ReactElement<TabProps>, {
                            onClick: this.onClick,
                            tabIndex: index,
                            isActive: index === this.state.activeIndex
                        });
                    })
                }
                <Underline style={{ top: position }} />
            </TabsBar>
        );
    }
}

export default VerticalTabs;
