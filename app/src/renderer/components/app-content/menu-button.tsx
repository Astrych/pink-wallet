
import React from "react";
import styled from "styled-components";

import SvgIcon from "../atoms/svg-icon";


const Button = styled.button`
    display: flex;
    align-items: center;
    user-select: none;
    border: none;
    padding: 0;
    margin: 15px 0px 15px 0px;
    background-color: transparent;
    :focus {
        outline: none;
    }
`;


interface MenuButtonProps {
    name: string;
}

export default function MenuButton(props: MenuButtonProps) {

    return (
        <Button>
            <SvgIcon name={props.name} size={31} />
        </Button>
    );
}
