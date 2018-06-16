
import React from "react";
import styled from "styled-components";

import { WindowIcon } from "./icons"; 


const Button = styled.button`
    -webkit-app-region: no-drag;
    user-select: none;
    border: none;
    padding: 0;
    color: ${(props) => props.theme.headerButtons};
    background-color: transparent;

    &:hover {
        color: grey;
    }
    &:active {
        color: pink;
    }
`;

interface AppButtonProps {
    name: string;
    icon: WindowIcon;
    onClick: React.EventHandler<React.MouseEvent<any>>;
}

function AppButton(props: AppButtonProps) {

    const { name, icon: Icon, onClick } = props;
    const title = name[0].toUpperCase() + name.substring(1);

    return (
        <Button
            aria-label={name}
            title={title}
            tabIndex={-1}
            onClick={onClick}>
            <Icon
                size={25}
                color="inherit"
                css={{verticalAlign: "baseline"}}
            />
        </Button>
    );
}

export default AppButton;
