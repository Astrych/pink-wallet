
import React from "react";
import styled, { keyframes, css } from "styled-components";

import pinkBuffalo from "@assets/img/Buffalo-pink.png";


interface SplashImgProps {
    onLoad?: React.EventHandler<React.SyntheticEvent<any>>;
    animate: boolean;
}

const fadeIn = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const anim = css`
    animation: ${fadeIn} 1.5s ease forwards;
`;

const Img = styled.img`
    width: 100%;
    height: 94%;
    margin-left: auto;
    margin-right: auto;
    -webkit-user-drag: none;
    filter: drop-shadow(16px 16px 16px #000);
    will-change: opacity;
    ${(props: SplashImgProps) => props.animate ? anim : "visibility: hidden;"}
`;

function SplashImg(props: SplashImgProps) {

    return (
        <Img
            src={pinkBuffalo}
            alt="Pink Buffalo Logo"
            onLoad={props.onLoad}
            animate={props.animate}
        />
    );
}

export default SplashImg;
