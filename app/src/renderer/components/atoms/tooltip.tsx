
import React, { Component, ReactNode } from "react";

import { styled, css } from "@view-utils/styles";


const text = {
    top:    css`bottom: 110%; left: 50%; transform: translateX(-50%);`,
    right:  css`left: 110%; top: 50%; transform: translateY(-50%);`,
    bottom: css`top: 110%; left: 50%; transform: translateX(-50%);`,
    left:   css`right: 110%; top: 50%; transform: translateY(-50%);`
}

const arrow = {
    top: css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: black transparent transparent transparent;
    `,
    right: css`
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        border-color: transparent black transparent transparent;
    `,
    bottom: css`
        bottom: 100%;
        left: 50%;
        border-color: transparent transparent black transparent;
        transform: translateX(-50%);
    `,
    left: css`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        border-color: transparent transparent transparent black;
    `
}

type Position = "top" | "right" | "bottom" | "left";

const TooltipText = styled.div<{ position: Position }>`
    opacity: 1;
    transition: opacity 1s;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    pointer-events: none;
    ${props => text[props.position]}
    &::after {
        content: "";
        position: absolute;
        ${props => arrow[props.position]}
        border-width: 5px;
        border-style: solid;
    }
`;

const TooltipContent = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    &:hover ${TooltipText} {
        opacity: 1;
    }
`;

interface TooltipProps {
    position: Position;
    text: string;
    children: ReactNode;
}

function Tooltip(props: TooltipProps) {
    return(
        <TooltipContent>
            {React.Children.only(props.children)}
            <TooltipText position={props.position}>
                {props.text}
            </TooltipText>
        </TooltipContent>
    );
}

export default Tooltip;
