
import React, { Component } from "react";

import { styled, css } from "@view-utils/styles";
import Tootlip from "./tooltip";
import SvgIcon from "./svg-icon";


export const TabContent = styled.div<{ active: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    ${props => props.active ? css`color: ${props => props.theme.text.primary};` : ""}

    &:hover, &:active {
        color: ${props => props.theme.text.primary};
    }
`;

export interface TabProps {
    name: string;
    iconSize: number;
    description: string;
    isActive: boolean;
    onClick?: (index?: number) => void;
    tabIndex?: number;
}

class Tab extends Component<TabProps> {

    static defaultProps = {
        iconSize: 31,
        isActive: false,
    }

    onClick = e => {
        e.preventDefault();
        const { tabIndex, onClick } = this.props;
        onClick && onClick(tabIndex);
    };

    render() {
        const { name, description, iconSize, isActive } = this.props;

        return (
            <TabContent onClick={this.onClick} active={isActive}>
                <Tootlip text={description} position="right">
                    <SvgIcon name={name} size={iconSize} />
                </Tootlip>
            </TabContent>
        );
    }
}

export default Tab;
