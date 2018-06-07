
import React from "react";
import styled, { keyframes } from "styled-components";


interface SplashImgProps {
    onLoad: React.EventHandler<React.SyntheticEvent<any>>;
    animate: boolean;
}

const fadeIn = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const Img = styled.img`

    height: 100%;
    object-fit: scale-down;
    margin: auto;
    -webkit-user-drag: none;
    filter: drop-shadow(16px 16px 16px #000);
    ${(props: SplashImgProps) => props.animate ? 
        `animation: ${fadeIn} 3s ease forwards;` : "visibility: hidden;"
    }
`;

function SplashImg(props: SplashImgProps) {

    return (
        <Img
            src="./img/Buffalo-pink.png"
            alt="Pink Buffalo Logo"
            onLoad={props.onLoad}
            animate={props.animate}
        />
    );
}

export default SplashImg;
