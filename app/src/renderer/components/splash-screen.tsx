
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";

import AnimatedSplashImg from "./splash/image";
import SplashProgress from "./splash/progress";


class SplashScreen extends React.Component {

    state = { show: false, progress: 0 };

    loadTimer;

    componentDidMount() {

    }

    onImgLoad = () => {
        this.setState({ show: true });

        this.loadTimer = setInterval(() => {
            if (this.state.progress === 105) {
                ipcRenderer.send("data-loaded");
            }
            this.setState({
                progress: this.state.progress + 1
            });
        }, 100);
    }

    render() {
        const { show, progress } = this.state;

        return <>
            <AnimatedSplashImg onLoad={this.onImgLoad} animate={show} />
            {show && <SplashProgress progress={progress} />}
        </>;
    }
}

export default hot(module)(SplashScreen);
