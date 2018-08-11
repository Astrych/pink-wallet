
import React from "react";
import styled, { keyframes } from "styled-components";

import { CircleProgress } from "../atoms/circle-progress";


const fadeIn = keyframes`
    0%   { opacity: 0; }
    100% { opacity: 1; }
`;

const Center = styled.div`
    position: absolute;
    top: 43%;
    left: 50%;
    transform: translateX(-50%);
    will-change: opacity;
    animation: ${fadeIn} 0.5s ease-in;
`;

interface SplashProgressProps {
    progress: number;
    error: boolean;
    stages?: number;
}

function SplashProgress(props: SplashProgressProps) {

    return(
        <Center>
            <CircleProgress
                progress={props.progress}
                error={props.error}
                stages={props.stages}
            />
        </Center>
    );
}

export default SplashProgress;
