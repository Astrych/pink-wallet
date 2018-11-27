
import React, { Component, SyntheticEvent } from "react";
import styled from "styled-components";

import Tootlip from "./tooltip";
import SvgIcon from "./svg-icon";


const Button = styled.button`
    display: flex;
    align-items: center;
    user-select: none;
    border: none;
    padding: 0;
    width: 100%;
    margin: 15px 0px 15px 0px;
    background-color: transparent;
    color: inherit;
    cursor: pointer;
    :focus {
        outline: none;
    }
    :hover {
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        color: ${props => props.theme.text.primary};
    }
`;


export interface MenuButtonProps {
    name: string;
    size: number;
    description: string;
    onClick?: () => void;
}

class MenuButton extends Component<MenuButtonProps> {

    static defaultProps: Partial<MenuButtonProps> = {
        size: 31,
    }

    onButtonClick = (e: SyntheticEvent) => {
        e.preventDefault();
        const { onClick } = this.props;
        onClick && onClick();
    };

    render() {
        const { description } = this.props;

        return (
            <Tootlip text={description} position="right">
                <Button onClick={this.onButtonClick}>
                    <SvgIcon name={this.props.name} size={this.props.size} />
                </Button>
            </Tootlip>
        );
    }
}

export default MenuButton;
