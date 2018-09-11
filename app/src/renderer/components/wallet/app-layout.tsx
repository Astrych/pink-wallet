
import styled from "styled-components";


export const AppLayout = styled.div`
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar content";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`;
