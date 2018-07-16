
import React from "react";
import styled, { keyframes } from "styled-components";
import { Progress } from "antd";


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

const LoadProgress = styled(Progress)`
    position: absolute;
    top: 50%;
    left: 50%;
    animation: ${fadeIn} 0.5s ease-in;

    .ant-progress-circle-trail {
        stroke: rgba(255, 255, 255, 0.31);
    }
`;

interface SplashProgressProps {
    progress: number;
    error: boolean;
}

function SplashProgress(props: SplashProgressProps) {

    interface VariadicProps {
        percent: number;
        status?: "exception";
    }

    const variadicProps: VariadicProps = {
        percent: props.progress
    };
    if (props.error) variadicProps.status = "exception";

    return(
        <LoadProgress
            type="circle"
            width={80}
            {...variadicProps}
        />
    );
}

export default SplashProgress;
