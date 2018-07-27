
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";

import SplashImg from "./splash/image";
import SplashProgress from "./splash/progress";

import { sleep } from "@common/utils";


interface ProgresStepArgs {
    step: number;
    total: number;
    subSteps: number;
}

/**
 * Calculates sub-steps to simulate fluid progess update.
 */
export function calcProgressSteps({ step, total, subSteps }: ProgresStepArgs) {
    const subProgress = 100/total;
    return Array.from(
        { length: subSteps },
        (_, i) => Math.ceil(subProgress*((i + 1)/subSteps + step))
    );
}

const progressQueue: Array<number> = [];

class SplashScreen extends React.Component {

    state = { show: false, progress: 0, error: false };

    componentDidMount() {

        // Creates illusion of more fluid progression.
        const updateProgressState = async (event, steps: number) => {
            while (--steps + 1) {
                while (progressQueue.length < 1) await sleep(10);

                this.setState({ progress: progressQueue.shift() });

                await sleep(30);

                // On progress successful finish.
                if (!steps) {
                    await sleep(500);
                    event.sender.send("splash-finished");
                }
            }
        };

        ipcRenderer.on("daemon-start-progress", (event, data) => {
            const subSteps = 100/data.total;
            progressQueue.push(...calcProgressSteps({
                step: data.step,
                total: data.total,
                subSteps
            }));

            if (data.step === 0) updateProgressState(event, 100);
        });

        ipcRenderer.on("daemon-error", (_, message) => {
            console.error(message);
            this.setState({ error: true });
        });
    }

    onImgLoad = () => {
        this.setState({ show: true });
    }

    render() {
        const { show, progress, error } = this.state;

        return <>
            <SplashImg onLoad={this.onImgLoad} animate={show} />
            {show && <SplashProgress progress={progress} error={error} />}
        </>;
    }
}

export default hot(module)(
    SplashScreen
);
