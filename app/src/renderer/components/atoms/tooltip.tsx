
import React, { Component, ReactNode } from "react";
import ReactDOM from "react-dom";

import { styled, css, keyframes } from "@view-utils/styles";


const fadeIn = keyframes`
    0%   { opacity: 0; }
    50%  { opacity: 0; }
    100% { opacity: 1; }
`;

const anim = css`
    animation: ${fadeIn} 1.5s ease forwards;
`;

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

const TooltipText = styled.div<{ show: boolean, position: Position }>`
    width: 130px;
    position: fixed;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 5px;
    z-index: 1;
    pointer-events: none;
    user-select: none;
    box-shadow: 2px 2px 3px rgba(0 ,0, 0, 0.3);
    will-change: opacity;
    ${props => props.show ? anim : "visibility: hidden;"}
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

    state = { show: false, top: "", left: "" };

    portalElement = document.createElement("div");

    componentDidMount() {
        const tooltipRoot = document.getElementById("tooltips");
        tooltipRoot!.appendChild(this.portalElement);
    }

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

        this.setState({ show: true, top, left });
    }

    hideTooltip = () => {
        this.setState({ show: false });
    }

    render() {
        const { children, position, text } = this.props;
        const { show, top, left } = this.state;
        const child = React.Children.only(children);

        return [
            React.cloneElement(child, {
                onMouseEnter: this.showTooltip,
                onMouseLeave: this.hideTooltip,
                onWheel: this.hideTooltip,
                key: "tab",
            }),
            ReactDOM.createPortal(
                <TooltipText position={position} show={show} style={{ top, left }}>
                    {text}
                </TooltipText>,
                this.portalElement,
            )
        ];
    }
}

export default Tooltip;
