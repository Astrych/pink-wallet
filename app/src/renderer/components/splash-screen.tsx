
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";

import SplashImg from "./splash-img";
import LoadProgress from "./load-progress";


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
                src="./img/Buffalo-pink.png"
                alt="Buffalo logo"
                onLoad={this.onImgLoad}
            />
            {show && <LoadProgress type="circle" percent={progress} width={80} />}
        </>;
    }
}

export default hot(module)(SplashScreen);
