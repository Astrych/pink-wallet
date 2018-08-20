
import React, { Component } from "react";
import styled from "styled-components";

import SvgIcon from "./svg-icon";


const Button = styled.button`
    display: flex;
    align-items: center;
    user-select: none;
    border: none;
    padding: 0;
    margin: 15px 0px 15px 0px;
    background-color: transparent;
    color: inherit;
    :focus {
        outline: none;
    }
`;


interface MenuButtonProps {
    name: string;
    size: number;
}

class MenuButton extends Component<MenuButtonProps> {

    static defaultProps = {
        size: 31,
    }

    render() {
        return (
            <Button>
                <SvgIcon name={this.props.name} size={this.props.size} />
            </Button>
        );
    }
}

export default MenuButton;
