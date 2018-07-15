
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";

import SplashImg from "./splash/image";
import SplashProgress from "./splash/progress";


interface ProgresStepArgs {
    step: number;
    total: number;
    subSteps: number;
}

export function calcProgressSteps({ step, total, subSteps }: ProgresStepArgs) {
    const subProgress = 100/total;
    return Array.from(
        { length: subSteps },
        (_, i) => Math.ceil(subProgress*((i + 1)/subSteps + step))
    );
}

const progressQueue = [];

class SplashScreen extends React.Component {

    state = { show: false, progress: 0 };

    componentDidMount() {

        const subSteps = 16;

        const queueProgressUpdate = (subStep, maxSteps) => {
            setTimeout(() => {
                const progress = progressQueue.shift();
                progress && this.setState({ progress });
                if (subStep < maxSteps && progressQueue.length > 0) {
                    queueProgressUpdate(subStep + 1, maxSteps);
                }

            }, 40);
        };

        ipcRenderer.on("daemon-start-progress", (event, data) => {
            progressQueue.push(...calcProgressSteps({
                step: data.step,
                total: data.total,
                subSteps
            }));

            queueProgressUpdate(0, subSteps);
        });
    }

    componentDidUpdate() {

        if (this.state.progress === 100) {
            setTimeout(() => ipcRenderer.send("splash-finished"), 500);
        }
    }

    onImgLoad = () => {
        this.setState({ show: true });
    }

    render() {
        const { show, progress } = this.state;

        return <>
            <SplashImg onLoad={this.onImgLoad} animate={show} />
            {show && <SplashProgress progress={progress} />}
        </>;
    }
}

export default hot(module)(
    SplashScreen
);
