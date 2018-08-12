
import React, { Component, ReactNode } from "react";
import styled from "styled-components";

import theme, { Theme, ThemedProps } from "../../themes";

interface Test {
    blabla: string;
}

const TabsBar = styled.div<ThemedProps>`
    color: ${props => props.theme.tabs.icons};
`;

interface VerticalTabsProps {
    width: number;
    children: ReactNode;
    ...ThemedProps;
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
