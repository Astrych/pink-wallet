
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";
import styled, { injectGlobal } from "styled-components";
import { Progress } from "antd";


injectGlobal`

    html, body {
        user-select: none;
        height: 100%;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        background: transparent;
    }
    img {
        border-style: none;
    }
    div#app {
        height: 100%;
        display: flex;
    }
`;

const SplashImg = styled.img`

    height: 100%;
    object-fit: scale-down;
    margin: auto;
    -webkit-user-drag: none;
    filter:
        sepia()
        saturate(100)
        hue-rotate(230deg)
        drop-shadow(16px 16px 16px #000);
`;

const LoadProgress = styled(Progress)`

    position: absolute;
    top: 50%;
    left: 50%;
`;

class SplashScreen extends React.Component {

    state = { show: false, progress: 0 };

    loadTimer;

    componentDidMount() {
        this.loadTimer = setInterval(() => {
            if (this.state.progress === 105) {
                ipcRenderer.send("data-loaded");
            }
            this.setState({
                progress: this.state.progress + 1
            });
        }, 100);
    }

    onImgLoad = () => {
        this.setState({ show: true });
    }

    render() {
        const { show, progress } = this.state;

        return <>
            <SplashImg
                src="./img/Buffalo.png"
                alt="Buffalo logo"
                onLoad={this.onImgLoad}
            />
            {show && <LoadProgress type="circle" percent={progress} width={80} />}
        </>;
    }
}

export default hot(module)(SplashScreen);
