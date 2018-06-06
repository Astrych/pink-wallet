
import React from "react";
import styled from "styled-components";
import { StyledIcon } from "styled-icons";


const Button = styled.button`
    -webkit-app-region: no-drag;
    user-select: none;
    border: none;
    outline: none;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0;
    height: 25px;
    color: white;
    background-color: transparent;

    &:hover {
        color: grey;
    }
    &:active {
        color: pink;
    }
`;

interface AppButtonProps {
    name: string,
    icon: StyledIcon,
    onClick: React.EventHandler<React.MouseEvent<any>>,
    styles?: object
}

function AppButton(props: AppButtonProps) {

    const { name, icon: Icon, onClick, styles } = props;
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
                style={{ verticalAlign: "baseline", ...styles }}
            />
        </Button>
    );
}

export default AppButton;
