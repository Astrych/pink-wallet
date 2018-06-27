
import React from "react";
import styled from "styled-components";


const Svg = styled.svg`
    width: 31px;
    height: 31px;
    margin: 18px 50px 18px 50px;
    fill: currentColor;
`;

function TabIcon(props) {

    return (
        <Svg>
            <use xlinkHref={`svg/tab-icons.svg#${props.name}`} />
        </Svg>
    );
}

export default TabIcon;
