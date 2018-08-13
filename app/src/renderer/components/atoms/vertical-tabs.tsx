
import React, { Component, ReactNode } from "react";

import { styled } from "@view-utils/styles";


const TabsBar = styled.div`
    color: ${props => props.theme.tabs.icons};
`;

interface VerticalTabsProps {
    width: number;
    children: ReactNode;
}

export class VerticalTabs extends Component<VerticalTabsProps> {

    static defaultProps = {
        width: 25,
    }

    render() {
        return (
            <TabsBar>
                {this.props.children}
            </TabsBar>
        );
    }
}
