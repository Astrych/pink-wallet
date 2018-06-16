
import React from "react";
import styled from "styled-components";


const Icon = styled.svg`
    fill: ${props => props.theme.icons};
    width: 35px;
    height: 35px;
    stroke-width: 1;
    stroke-opacity: 0.5;
    stroke: ${props => props.theme.icons};
`;

const TabIcon = (props) => (
    <Icon>
        <use xlinkHref={`svg/tab-icons.svg#${props.name}`} />
    </Icon>
);

export default TabIcon;
