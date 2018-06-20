
import React from "react";
import styled from "styled-components";


const Button = styled.button`
    -webkit-app-region: no-drag;
    user-select: none;
    border: none;
    padding: 0;
    color: ${props => props.theme.headerButtons};
    background-color: transparent;
    width: 24px;
    height: 25px;

    &:hover {
        color: ${props => props.theme.headerButtonsHover};
    }
    &:active {
        color: ${props => props.theme.headerButtonsActive};
    }
`;

interface HeaderButtonProps {
    name: string;
    icon: JSX.Element;
    onClick: React.EventHandler<React.MouseEvent<any>>;
}

export function HeaderButton(props: HeaderButtonProps) {

    const { name, icon, onClick } = props;

    return (
        <Button
            aria-label={name}
            tabIndex={-1}
            onClick={onClick}
        >
            {icon}
        </Button>
    );
}

export default HeaderButton;
