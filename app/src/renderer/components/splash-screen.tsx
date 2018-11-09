
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";
import { NamespacesConsumer as Translate } from "react-i18next";

import SplashImg from "./splash/image";
import SplashProgress from "./splash/progress";
import Message from "./splash/message";

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

interface SplashScreenState {
    show: boolean;
    progress: number;
    error: boolean;
    stages: number;
    animated: boolean;
    description: string;
}

class SplashScreen extends React.Component<{}, SplashScreenState> {

    state = {
        show: false,
        progress: 0,
        error: false,
        stages: 0,
        animated: true,
        description: "init"
    };

    componentDidMount() {

        // Creates illusion of more fluid progression.
        const updateProgressState = async (event, steps: number) => {
            while (--steps + 1) {
                while (progressQueue.length < 1) await sleep(10);

                this.setState({ progress: progressQueue.shift() as number });

                await sleep(30);

                // On progress successful finish.
                if (!steps) {
                    this.setState({ description: "start-end" });
                    await sleep(500);
                    event.sender.send("splash-loading-finished");
                }
            }
        };

        ipcRenderer.on("daemon-download-start", () => {
            this.setState({ description: "download" });
        });

        ipcRenderer.on("daemon-download-progress", (_, data) => {
            this.setState({ progress: data.progress });
        });

        ipcRenderer.on("daemon-download-end", () => {
            this.setState({ description: "download-end", animated: false });
        });

        ipcRenderer.on("daemon-unpack", () => {
            this.setState({ progress: 0, description: "unpack", animated: true });
        });

        ipcRenderer.on("daemon-unpack-end", () => {
            this.setState({ description: "unpack-end" });
        });

        ipcRenderer.on("daemon-start-progress", (event, data) => {
            // if (data.step > 1) return;
            const subSteps = 100/data.total;
            progressQueue.push(...calcProgressSteps({
                step: data.step,
                total: data.total,
                subSteps
            }));

            if (data.step === 0) {
                this.setState({ stages: data.total, description: "start" });
                updateProgressState(event, 100);
            }
        });

        ipcRenderer.on("daemon-error", async (event, message) => {
            console.error(message);
            this.setState({ error: true, description: message });
            // TODO: Show popup...
            // ... or center message box + add close button...
            await sleep(2000);
            event.sender.send("app-shutdown");
        });
    }

    onImgLoad = () => {
        this.setState({ show: true });
    }

    render() {
        const { show, progress, stages, animated, description, error } = this.state;

        return (
            <Translate ns="splash">
                {t => <>
                    <SplashImg onLoad={this.onImgLoad} animate={show} />
                    {
                        show && <>
                            <SplashProgress
                                progress={progress}
                                error={error}
                                stages={stages}
                                animated={animated}
                            />
                            <Message>{error ? description : t(description)}</Message>
                        </>
                    }
                </>}
            </Translate>
        );
    }
}

export default hot(module)(
    SplashScreen
);
