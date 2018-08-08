
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

export const Svg = styled.svg<{  size: number }>`
    animation: ${fadeIn} 0.5s ease-in;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

export const Circle = styled.circle<{ color: string }>`
    fill: none;
    stroke: ${props => props.color};
    transform-origin: center;
    transform: rotate(-90deg);
`;

export const BackgroundCircle = Circle.extend``;

export const PrimaryCircle = Circle.extend`
    transition: stroke-dashoffset 0.15s;
`;


interface CircleProgressProps {
    progress: number;
    error: boolean;
    circleSize: number;
    strokeSize: number;
}

export class CircleProgress extends Component<CircleProgressProps> {

    static defaultProps = {
        circleSize: 100,
        strokeSize: 10
    }

    get circleSize() {
        return this.props.circleSize;
    }

    get strokeSize() {
        return this.props.strokeSize;
    }

    get circleRadius() {
        return this.circleSize/2 - this.strokeSize/2;
    }

    get circumference() {
        return 2*Math.PI*this.circleRadius;
    }

    get circleCenter() {
        return this.circleSize/2;
    }

    get strokeDasharray() {
        return `${this.circumference} ${this.circumference}`;
    }

    render() {
        const { progress, error } = this.props;

        let strokeDashoffset = 0;
        if (progress <= 0) {
            strokeDashoffset = this.circumference

        } else if (progress < 100) {
            strokeDashoffset = this.circumference - progress/100*this.circumference;
        }

        let color = "blue";
        if (error) color = "red";
        else if (progress >= 100) color = "green";

        return(
            <Svg size={this.circleSize}>
                <BackgroundCircle
                    color="lightGrey"
                    strokeWidth={this.strokeSize}
                    strokeDasharray={this.strokeDasharray}
                    r={this.circleRadius}
                    cx={this.circleCenter}
                    cy={this.circleCenter}
                />
                <PrimaryCircle
                    color={color}
                    strokeWidth={this.strokeSize}
                    strokeDasharray={this.strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    r={this.circleRadius}
                    cx={this.circleCenter}
                    cy={this.circleCenter}
                />
            </Svg>
        );
    }
}
