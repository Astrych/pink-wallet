
import React from "react";
import styled from "styled-components";


const Icon = styled.div`
    width: 80px;
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const Svg = styled.svg`
    width: 31px;
    height: 26px;
    stroke-width: 1;
    stroke-opacity: 0.5;
    stroke: ${props => props.theme.tabsIcons};
    fill: ${props => props.theme.tabsIcons};
`;

const Span = styled.span`
    user-select: none;
    margin-top: 3px;
    font-size: 12px;
`;


function TabIcon(props) {

    return (
        <Icon>
            <Svg>
                <use xlinkHref={`svg/tab-icons.svg#${props.name}`} />
            </Svg>
            <Span>{props.title}</Span>
        </Icon>
    );
}

export default TabIcon;
