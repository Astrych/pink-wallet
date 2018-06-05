
import React from "react";
import styled from "styled-components";
import { StyledIcon } from "styled-icons";


const Button = styled.button`
    user-select: none;
    -webkit-app-region: no-drag;
    background-color: transparent;
    border: none;
    outline: none;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0;
    height: 25px;
    color: white;

    &:hover {
        color: grey;
    }
    &:active {
        color: pink;
    }
`;

function WindowButton(

    name: string,
    Icon: StyledIcon,
    onClick: React.EventHandler<React.MouseEvent<any>>,
    styles: object={}

) {
    const title = name[0].toUpperCase() + name.substring(1);

    return (
        <Button aria-label={name} title={title} tabIndex={-1} onClick={onClick}>
            <Icon
                size={25}
                color="inherit"
                style={{ verticalAlign: "baseline", ...styles }}
            />
        </Button>
    );
}

export default WindowButton;
