
import styled, { keyframes } from "styled-components";


const fadeIn = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const Message = styled.span`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-width: 200px;
    max-width: 615px;
    word-wrap: break-word;
    padding: 8px;
    color: black;
    background: rgba(255, 255, 255, 0.55);
    border: 2px solid #fff;
    border-radius: 20px/50px;
    background-clip: padding-box;
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in;
`;

export default Message;
