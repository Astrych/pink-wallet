
import React from "react";
import styled from "styled-components";

import "@assets/svg/icons.svg";


interface SvgProps {
    size: number;
}

const Svg = styled.svg`
    width: ${(props: SvgProps) => props.size}px;
    height: ${(props: SvgProps) => props.size}px;
    margin: auto;
    fill: currentColor;
    stroke-width: 20px;
`;

interface SvgIconProps {
    name: string;
    size: number;
}

function SvgIcon(props: SvgIconProps) {

    return (
        <Svg size={props.size}>
            <use xlinkHref={`#icons_${props.name}`} />
        </Svg>
    );
}

export default SvgIcon;
