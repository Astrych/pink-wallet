
import { remote } from "electron";
import React, { Component } from "react";

import {

    Header,
    BarRow,
    LogoCol,
    ButtonsCol

} from "./layout";
import {

    PinkIcon,
    WindowMinimize,
    WindowMaximize,
    WindowRestore,
    WindowClose

} from "./icons";
import AppButton from "./button";


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
                <BarRow type="flex" justify="center">
                    <LogoCol span={12}>
                        <PinkIcon />
                    </LogoCol>
                    <ButtonsCol span={12}>
                        <AppButton
                            name="minimize"
                            icon={WindowMinimize}
                            onClick={this.onMinimize}
                        />
                        {
                            windowState === "maximized" ?
                            <AppButton
                                name="restore"
                                icon={WindowRestore}
                                onClick={this.onRestore}
                            /> :
                            <AppButton
                                name="maximize"
                                icon={WindowMaximize}
                                onClick={this.onMaximize}
                            />
                        }
                        <AppButton
                            name="close"
                            icon={WindowClose}
                            onClick={this.onClose}
                        />
                    </ButtonsCol>
                </BarRow>
            </Header>
        );
    }
}

export default AppHeader;
