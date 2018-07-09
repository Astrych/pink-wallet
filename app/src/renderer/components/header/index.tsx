
import { remote } from "electron";
import React, { Component } from "react";

import {

    Header,
    DragBar,

} from "./layout";
import HeaderButton from "./button";
import SvgIcon from "../atoms/svg-icon";


interface AppBarState {
    windowState: string
}

class AppHeader extends Component<{}, AppBarState> {

    window = remote.getCurrentWindow();

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
    }

    public shouldComponentUpdate(nextProps: {}, nextState: AppBarState) {
        return nextState.windowState !== this.state.windowState;
    }

    private onWindowStateChanged(windowState: string) {
        this.setState({ windowState });
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
                <DragBar type="flex" justify="end">
                    {
                        process.platform !== "darwin" &&
                        [
                            <HeaderButton
                                icon={<SvgIcon name="minimize" size={14} />}
                                onClick={this.onMinimize}
                                key="minimize"
                            />,
                            windowState === "maximized" ?
                            <HeaderButton
                                icon={<SvgIcon name="maximize" size={14} />}
                                onClick={this.onRestore}
                                key="restore"
                            /> :
                            <HeaderButton
                                icon={<SvgIcon name="maximize" size={14} />}
                                onClick={this.onMaximize}
                                key="maximize"
                            />,
                            <HeaderButton
                                icon={<SvgIcon name="close" size={14} />}
                                onClick={this.onClose}
                                key="close"
                            />,
                        ]
                    }
                </DragBar>
            </Header>
        );
    }
}

export default AppHeader;
