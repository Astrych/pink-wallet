
import React from "react";
import styled from "styled-components";


interface SvgProps {
    size: number;
}

const Svg = styled.svg`
    width: ${(props: SvgProps) => props.size}px;
    height: ${(props: SvgProps) => props.size}px;
    margin: auto;
    fill: currentColor;
`;

interface SvgIconProps {
    name: string;
    size: number;
}

function SvgIcon(props: SvgIconProps) {

    return (
        <Svg size={props.size}>
            <use xlinkHref={`svg/icons.svg#${props.name}`} />
        </Svg>
    );
}

export default SvgIcon;
