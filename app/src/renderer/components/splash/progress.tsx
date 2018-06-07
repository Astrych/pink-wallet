
import React from "react";
import styled, { keyframes } from "styled-components";
import { Progress } from "antd";


const fadeIn = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const LoadProgress = styled(Progress)`
    position: absolute;
    top: 50%;
    left: 50%;
    animation: ${fadeIn} 3s ease forwards;
`;

interface SplashProgressProps {
    progress: number;
}

function SplashProgress(props: SplashProgressProps) {

    return(
        <LoadProgress type="circle" percent={props.progress} width={80} />
    );
}

export default SplashProgress;
