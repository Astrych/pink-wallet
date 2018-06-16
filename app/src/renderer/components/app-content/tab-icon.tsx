
import React from "react";
import styled from "styled-components";


const DescIcon = styled.div`
    width: 110px;
    display: flex;
    flex-flow: column;
    align-items: center;
`;

const Icon = styled.svg`
    fill: ${props => props.theme.icons};
    width: 30px;
    height: 30px;
    stroke-width: 1;
    stroke-opacity: 0.5;
    stroke: ${props => props.theme.icons};
`;

const Span = styled.span`
    user-select: none;
    margin-top: 3px;
`;


function TabIcon(props) {

    return (
        <DescIcon>
            <Icon>
                <use xlinkHref={`svg/tab-icons.svg#${props.name}`} />
            </Icon>
            <Span>{props.title}</Span>
        </DescIcon>
    );
}

export default TabIcon;
