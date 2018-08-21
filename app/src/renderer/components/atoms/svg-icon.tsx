
import React from "react";
import styled from "styled-components";

import "@assets/svg/icons.svg";


const Svg = styled.svg<{ size: number }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    margin: auto;
    fill: currentColor;
    stroke-width: 20px;
`;

interface SvgIconProps {
    name: string;
    size: number;
    className?: string;
}

function SvgIcon(props: SvgIconProps) {

    return (
        <Svg size={props.size} className={props.className}>
            <use xlinkHref={`#icons_${props.name}`} />
        </Svg>
    );
}

export default SvgIcon;
