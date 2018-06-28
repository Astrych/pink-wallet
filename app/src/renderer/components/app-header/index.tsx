
import { remote } from "electron";
import React, { Component } from "react";

import {

    Header,
    BarRow,
    Filler,

} from "./layout";
import HeaderButton from "./button";
import HeaderIcon from "./icon";


interface AppBarState {
    windowState: string
}

class AppHeader extends Component<{}, AppBarState> {

    window = remote.getCurrentWindow();
    appTitle = this.getTitle();

    state = {
        windowState: this.getWindowState()
    };

    public componentWillMount() {
        this.window.on("maximize", () => this.onWindowStateChanged("maximized"));
        this.window.on("minimize", () => this.onWindowStateChanged('minimized'));
        this.window.on("unmaximize", () => this.onWindowStateChanged("normal"));
        this.window.on("restore", () => this.onWindowStateChanged("normal"));
        this.window.on("hide", () => this.onWindowStateChanged("hidden"));
        this.window.on("show", () => this.onWindowStateChanged("normal"));

        // Workaround: partial fix for issue with maximization and restoring
        // https://github.com/electron/electron/issues/12971
        if (process.platform === "win32") {
            this.window.on("unmaximize", () => {
                const bounds = this.window.getBounds();
                bounds.width += 1;
                this.window.setBounds(bounds);
                bounds.width -= 1;
                this.window.setBounds(bounds);
            });
        }
    }

    public shouldComponentUpdate(nextProps: {}, nextState: AppBarState) {
        return nextState.windowState !== this.state.windowState;
    }

    private onWindowStateChanged(windowState: string) {
        this.setState({ windowState });
    }

    private getTitle() {
        return this.window.getTitle();
    }

    private getWindowState() {

        if (this.window.isFullScreen()) {
            return "full-screen";
        } else if (this.window.isMaximized()) {
            return "maximized";
        } else if (this.window.isMinimized()) {
            return "minimized";
        } else if (!this.window.isVisible()) {
            return "hidden";
        } else {
            return "normal";
        }
    }

    private onMinimize = () => {
        this.window.minimize();
    };

    private onMaximize = () => {
        this.window.maximize();
    };

    private onRestore = () => {
        this.window.unmaximize();
    };

    private onClose = () => {
        this.window.close();
    };

    public render() {

        const { windowState } = this.state;

        return (
            <Header>
                <Filler />
                <BarRow type="flex" justify="end">
                    {
                        process.platform !== "darwin" &&
                        [
                            <HeaderButton
                                name="minimize"
                                icon={<HeaderIcon name="minimize" />}
                                onClick={this.onMinimize}
                                key="minimize"
                            />,
                            windowState === "maximized" ?
                            <HeaderButton
                                name="restore"
                                icon={<HeaderIcon name="maximize" />}
                                onClick={this.onRestore}
                                key="restore"
                            /> :
                            <HeaderButton
                                name="maximize"
                                icon={<HeaderIcon name="maximize" />}
                                onClick={this.onMaximize}
                                key="maximize"
                            />,
                            <HeaderButton
                                name="close"
                                icon={<HeaderIcon name="close" />}
                                onClick={this.onClose}
                                key="close"
                            />,
                        ]
                    }
                </BarRow>
            </Header>
        );
    }
}

export default AppHeader;
