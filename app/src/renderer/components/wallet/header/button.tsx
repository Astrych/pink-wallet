
import React from "react";
import styled from "styled-components";


const Button = styled.button`
    -webkit-app-region: no-drag;
    user-select: none;
    border: none;
    padding: 0;
    outline: none;
    color: ${props => props.theme.header.buttons.default};
    background-color: transparent;
    width: 24px;
    height: 24px;

    &:hover {
        color: ${props => props.theme.header.buttons.hover};
    }
    &:active {
        stroke: ${props => {
            switch(props.name) {
                case "minimize":
                    return props.theme.header.buttons.active.minimize;
                case "maximize":
                case "restore":
                    return props.theme.header.buttons.active.maximizeRetore;
                case "close":
                    return props.theme.header.buttons.active.close;
            }
        }};
    }
`;

interface HeaderButtonProps {
    name: "minimize" | "restore" | "maximize" | "close" ;
    icon: JSX.Element;
    onClick: React.EventHandler<React.MouseEvent<any>>;
}

export function HeaderButton(props: HeaderButtonProps) {

    const { name, icon, onClick } = props;

    return (
        <Button
            name={name}
            tabIndex={-1}
            onClick={onClick}
        >
            {icon}
        </Button>
    );
}

export default HeaderButton;
