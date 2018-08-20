
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

    &:hover {
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
`;

export interface TabProps {
    name: string;
    index: number;
    active: boolean;
    iconSize: number;
    description: string;
    onClick?: (name: string, index: number) => void;
}

class Tab extends Component<TabProps> {

    static defaultProps = {
        iconSize: 31,
        index: 0,
        active: false,
    }

    onTabClick = e => {
        e.preventDefault();
        const { onClick, index, name } = this.props;
        onClick && onClick(name, index);
    };

    render() {
        const { name, description, iconSize, active } = this.props;

        return (
            <TabContent onClick={this.onTabClick} active={active}>
                <Tootlip text={description} position="right">
                    <SvgIcon name={name} size={iconSize} />
                </Tootlip>
            </TabContent>
        );
    }
}

export default Tab;
