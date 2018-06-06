
import { remote, ipcRenderer } from "electron";
import React from "react";
import {
    
    WindowMinimize,
    Square as WindowMaximize,
    Clone as WindowRestore

} from "styled-icons/fa-regular";
import { X as WindowClose } from "styled-icons/octicons";

import {

    AppBar,
    BarRow,
    LogoCol,
    TitleCol,
    ButtonsCol,
    PinkIcon,
    Title

} from "../components/AppToolbar";
import WindowButton from "../components/WindowButton";


interface State {
    windowState: string
}

class TitleBar extends React.Component<{}, State> {

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

        // Hack: temporary fix for issue with maximization
        // https://github.com/electron/electron/issues/12971
        this.window.on("unmaximize", () => {
            const bounds = this.window.getBounds();
            bounds.width += 1;
            this.window.setBounds(bounds);
            bounds.width -= 1;
            this.window.setBounds(bounds);
        });
    }

    public shouldComponentUpdate(nextProps: {}, nextState: State) {
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
    }

    private onMaximize = () => {
        this.window.maximize();
    }

    private onRestore = () => {
        this.window.unmaximize();
    }

    private onClose = () => {
        this.window.close();
    }

    public render() {

        const { windowState } = this.state;

        return (
            <AppBar>
                <BarRow type="flex" justify="center">
                    <LogoCol span={8}>
                        <PinkIcon src="./img/icon-256x256.png" />
                    </LogoCol>
                    <TitleCol span={8}>
                        <Title>
                            {this.appTitle}
                        </Title>
                    </TitleCol>
                    <ButtonsCol span={8}>
                        <WindowButton
                            name="restore"
                            icon={WindowMinimize}
                            onClick={this.onMinimize}
                        />;
                        {
                            windowState === "maximized" ?
                            <WindowButton
                                name="restore"
                                icon={WindowRestore}
                                onClick={this.onRestore}
                                styles={{
                                    transform: "rotate(90deg) scaleY(-1)"
                                }}
                            /> :
                            <WindowButton
                                name="maximize"
                                icon={WindowMaximize}
                                onClick={this.onMaximize}
                            />
                        }
                        <WindowButton
                            name="close"
                            icon={WindowClose}
                            onClick={this.onClose}
                        />;
                    </ButtonsCol>
                </BarRow>
            </AppBar>
        );
    }
}

export default TitleBar;
