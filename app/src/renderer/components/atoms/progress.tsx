
import React, { Component } from "react";
import styled, { keyframes } from "styled-components";


const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.1, 0.1);
    }

    80% {
        opacity: 0.0;
        transform: scale(0.1, 0.1);
    }

    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

interface SvgProps {
    radius: number;
}

export const Svg = styled.svg`
    animation: ${fadeIn} 0.5s ease-in;
    width: ${(props: SvgProps) => 2*props.radius}px;
    height: ${(props: SvgProps) => 2*props.radius}px;
`;

interface CircleProps {
    color: string;
    offset: number;
}

export const Circle = styled.circle`
    stroke: ${(props: CircleProps) => props.color};
    fill: transparent;
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;

    stroke-dashoffset: ${(props: CircleProps) => props.offset};
`;


interface CircleProgressProps {
    progress: number;
    error: boolean;
}

export class CircleProgress extends Component<CircleProgressProps> {

    radius = 50;
    stroke = 5;

    normalizedRadius = this.radius - this.stroke*2;
    circumference = this.normalizedRadius*2*Math.PI;

    render() {
        const { progress, error } = this.props;

        const strokeDashoffset = this.circumference - progress/100*this.circumference;
        let color = "blue";

        if (error) color = "red";
        else if (progress >= 100) color = "green";

        return(
            <Svg radius={50}>
                <Circle
                    color={color}
                    strokeWidth={this.stroke}
                    strokeDasharray={`${this.circumference} ${this.circumference}`}
                    offset={strokeDashoffset}
                    r={this.normalizedRadius}
                    cx={this.radius}
                    cy={this.radius}
                />
            </Svg>
        );
    }
}
