
import React from "react";
import styled from "styled-components";

import TabIcon from "./tab-icon";


const Button = styled.button`
    display: flex;
    align-items: center;
    user-select: none;
    border: none;
    padding: 0;
    background-color: transparent;
    :focus {
        outline: none;
    }
`;


interface MenuButtonProps {
    name: string;
    title: string;
}

export default function MenuButton(props: MenuButtonProps) {

    return (
        <Button>
            <TabIcon name={props.name} title={props.title} />
        </Button>
    );
}
