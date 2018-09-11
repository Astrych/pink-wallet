
import React, { Component, ReactNode } from "react";

import { styled, css } from "@view-utils/styles";


const text = {
    top:    css`transform: translateX(-50%) translateY(-120%);`,
    right:  css`transform: translateY(-50%) translateX(5%);`,
    bottom: css`transform: translateX(-50%) translateY(20%);`,
    left:   css`transform: translateY(-50%) translateX(-105%);`,
}

const arrow = {
    top: css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    `,
    right: css`
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        border-color: transparent rgba(0, 0, 0, 0.8) transparent transparent;
    `,
    bottom: css`
        bottom: 100%;
        left: 50%;
        border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
        transform: translateX(-50%);
    `,
    left: css`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        border-color: transparent transparent transparent rgba(0, 0, 0, 0.8);
    `
}

type Position = "top" | "right" | "bottom" | "left";

const TooltipText = styled.div<{ position: Position }>`
    position: fixed;
    transition: opacity 1s;
    width: 130px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;
    z-index: 1;
    pointer-events: none;
    box-shadow: 2px 2px 3px rgba(0 ,0, 0, 0.3);
    ${props => text[props.position]}
    &::after {
        content: "";
        position: absolute;
        ${props => arrow[props.position]}
        border-width: 5px;
        border-style: solid;
    }
`;

interface TooltipProps {
    position: Position;
    text: string;
    children: ReactNode;
}

class Tooltip extends Component<TooltipProps> {

    static defaultProps = {
        position: "right"
    }

    state = { opacity: 0, top: "", left: "" };

    showTooltip = event => {
        const elm = event.target;
        const { x, y, width, height } = elm.getBoundingClientRect();

        // Defaults to "right".
        let top = `${y + height/2}px`;
        let left = `${x + width}px`;

        switch (this.props.position) {
            case "top":
                top = `${y}px`;
                left = `${x + width/2}px`;
                break;
            case "bottom":
                top = `${y + height}px`;
                left = `${x + width/2}px`;
                break;
            case "left":
                top = `${y + height/2}px`;
                left = `${x}px`;
        }

        this.setState({ opacity: 1, top, left });
    }

    hideTooltip = () => {
        this.setState({ opacity: 0 });
    }

    render() {
        const { children, position, text } = this.props;
        const child = React.Children.only(children);
        const { opacity, top, left } = this.state;

        return <>
            {
                React.cloneElement(child, {
                    onMouseEnter: this.showTooltip,
                    onMouseLeave: this.hideTooltip,
                })
            }
            <TooltipText position={position} style={{ opacity, top, left }}>
                {text}
            </TooltipText>
        </>;
    }
}

export default Tooltip;
