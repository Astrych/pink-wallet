
import React, { Component } from "react";
import styled from "styled-components";
import Color from "color";


const Progress = styled.div`
    display: inline-block;
    border-radius: 100px;
    vertical-align: middle;
    position: relative;
    line-height: 1;
`;

const Label = styled.span`
    display: block;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    margin: 0;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.75);
`;

const Svg = styled.svg<{  size: number }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
`;

const Circle = styled.circle`
    fill: none;
    transform-origin: center;
    transform: rotate(-90deg);
    stroke-linecap: round;
`;

const AnimatedCircle = Circle.extend`
    transition: stroke-dashoffset 0.15s;
`;

interface CircleProgressProps {
    progress: number;
    error: boolean;
    stages?: number;
    circleSize: number;
    strokeSize: number;
    startColor: string;
    endColor: string;
}

export class CircleProgress extends Component<CircleProgressProps> {

    static defaultProps = {
        circleSize: 100,
        strokeSize: 10,
        startColor: "rgb(255, 195, 15)",
        endColor: "rgb(77, 176, 79)"
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

    get progress() {
        return Math.min(Math.max(this.props.progress, 0), 100);
    }

    get normProgress() {
        return this.progress/100;
    }

    get progressColor() {
        const start = Color(this.props.startColor);
        const end = Color(this.props.endColor);

        if (this.props.error) return "red";
        else return start.mix(end, this.normProgress).string();
    }

    get normStage() {
        if (!this.props.stages) return 0;
        const stageSize = 1/this.props.stages;
        return Math.floor(this.normProgress/stageSize)*stageSize + stageSize;
    }

    render() {
        const progressOffset = this.circumference*(1 - this.normProgress);
        const stageOffset = this.circumference*(1 - this.normStage);

        return(
            <Progress>
                <Label>{this.progress}%</Label>
                <Svg size={this.circleSize}>
                    {/* Background Circle */}
                    <Circle
                        stroke="rgba(255, 255, 255, 0.31)"
                        strokeWidth={this.strokeSize}
                        strokeDasharray={this.strokeDasharray}
                        r={this.circleRadius}
                        cx={this.circleCenter}
                        cy={this.circleCenter}
                    />
                    {/* Stages Circle */}
                    ${
                        this.props.stages &&
                        <AnimatedCircle
                            stroke="rgb(135,206,235, 0.35)"
                            strokeWidth={this.strokeSize}
                            strokeDasharray={this.strokeDasharray}
                            strokeDashoffset={stageOffset}
                            r={this.circleRadius}
                            cx={this.circleCenter}
                            cy={this.circleCenter}
                        />
                    }
                    {/* Progress Circle */}
                    <AnimatedCircle
                        stroke={this.progressColor}
                        strokeWidth={this.strokeSize}
                        strokeDasharray={this.strokeDasharray}
                        strokeDashoffset={progressOffset}
                        r={this.circleRadius}
                        cx={this.circleCenter}
                        cy={this.circleCenter}
                    />
                </Svg>
            </Progress>
        );
    }
}
