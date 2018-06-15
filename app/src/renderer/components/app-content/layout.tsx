
import styled from "styled-components";
import { Layout, Row, Col } from "antd";


export const Content = styled(Layout.Content)`
    background-color: ${(props) => props.theme.primary};
    height: 100vh;
`;
