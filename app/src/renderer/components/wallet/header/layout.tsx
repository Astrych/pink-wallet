
import styled from "styled-components";


export const Header = styled.div`
    max-height: var(--title-bar-height);
    background-color: ${props => props.theme.header.bar};
    padding: 0;
    grid-area: header;
`;

export const DragBar = styled.div`
    display: flex;
    justify-content: flex-end;
    -webkit-app-region: drag;
    user-select: none;
    --bar-row-margin: 5px;
    margin: var(--bar-row-margin) var(--bar-row-margin) 0px var(--bar-row-margin);
    height: calc(var(--title-bar-height) - var(--bar-row-margin));
    line-height: 11px;
    > button:not(:last-child) {
        margin-right: 10px;
    }
`;
