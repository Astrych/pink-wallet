
import styled from "styled-components";


const View = styled.div`
    background-color: ${props => props.theme.content.secondary};
    grid-area: a;
    align-self: center;
    justify-self: center;

    display: flex;
    flex-direction: column;
    > *:not(:last-child) {
        margin-bottom: 5px;
    }
`;

export default View;
