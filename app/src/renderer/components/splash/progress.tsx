
import React from "react";
import styled, { keyframes } from "styled-components";

import { CircleProgress } from "../atoms/circle-progress";


const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.1, 0.1);
    }

    80% {
        opacity: 0.0;
        transform: scale(0.1, 0.1);
    }

    100% {
        opacity: 1;
        transform: scale(1, 1);
    }
`;

const Center = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    will-change: opacity;
    will-change: transform;
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
                stages={4}
            />
        </Center>
    );
}

export default SplashProgress;
