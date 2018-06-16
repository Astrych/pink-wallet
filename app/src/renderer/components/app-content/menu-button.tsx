
import React from "react";
import styled from "styled-components";
import { Menu } from "styled-icons/feather/Menu";


const Button = styled.button`
    user-select: none;
    border: none;
    padding: 0;
    background-color: transparent;
    margin-left: 5px;
    :focus {
        outline: none;
    }
`;

const MenuIcon = styled(Menu)`
    color: ${props => props.theme.tabsIcons};
`;

export default function MenuButton() {

    return (
        <Button>
            <MenuIcon size={45} />
        </Button>
    );
}
