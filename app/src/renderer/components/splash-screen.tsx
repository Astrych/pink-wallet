
import { ipcRenderer } from "electron";
import React from "react";
import { hot } from "react-hot-loader";
import { I18n } from "react-i18next";

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

class SplashScreen extends React.Component {

    state = {
        show: false,
        progress: 0,
        error: false,
        stages: undefined,
        description: "init"
    };

    componentDidMount() {

        // Creates illusion of more fluid progression.
        const updateProgressState = async (event, steps: number) => {
            while (--steps + 1) {
                while (progressQueue.length < 1) await sleep(10);

                this.setState({ progress: progressQueue.shift() });

                await sleep(30);

                // On progress successful finish.
                if (!steps) {
                    this.setState({ description: "done" });
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
            this.setState({ progress: 0 });
            this.setState({ description: "unpack" });
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
                this.setState({ description: "start" });
                this.setState({ stages: data.total });
                updateProgressState(event, 100);
            }
        });

        ipcRenderer.on("daemon-error", (_, message) => {
            console.error(message);
            this.setState({ error: true });
            // TODO: Show popup...
            // ... or center message box + add close button...
            // TODO: Start shutdown...
        });
    }

    onImgLoad = () => {
        this.setState({ show: true });
    }

    render() {
        const { show, progress, stages, description, error } = this.state;

        return (
            <I18n ns="splash">
                {t => <>
                    <SplashImg onLoad={this.onImgLoad} animate={show} />
                    {
                        show && <>
                            <SplashProgress
                                progress={progress}
                                error={error}
                                stages={stages}
                            />
                            <Message>{t(description)}</Message>
                        </>
                    }
                </>}
            </I18n>
        );
    }
}

export default hot(module)(
    SplashScreen
);
