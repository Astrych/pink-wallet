
import styled, { keyframes } from "styled-components";


const fadeIn = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const Message = styled.span`
    will-change: opacity;
    animation: ${fadeIn} 0.5s ease-in;
    position: absolute;
    bottom: 15px;
    left: 10px;
    right: 10px;
    min-width: 200px;
    max-width: 615px;
    word-wrap: break-word;
    padding: 6px;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px grey, 0 0 5px darkblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: rgba(215, 215, 215, 0.58);
    border: 2px solid rgba(192,192,192, 0.58);
    border-radius: 20px/50px;
    background-clip: padding-box;
    text-align: center;
    font-size: 18px;
`;

export default Message;
