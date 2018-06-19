
import React from "react";
import styled from "styled-components";


const Svg = styled.svg`
    width: 16px;
    height: 16px;
    fill: currentColor;
`;

interface HeaderIconProps {
    name: string;
}

function HeaderIcon(props: HeaderIconProps) {

    return (
        <Svg>
            <use xlinkHref={`svg/title-bar-icons.svg#${props.name}`} />
        </Svg>
    );
}

export default HeaderIcon;
