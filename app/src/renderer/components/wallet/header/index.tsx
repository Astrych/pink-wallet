
import { ipcRenderer } from "electron";
import React, { Component } from "react";

import {

    Header,
    DragBar,

} from "./layout";
import HeaderButton from "./button";
import SvgIcon from "@components/atoms/svg-icon";


interface AppBarState {
    windowState: string;
}

class AppHeader extends Component<{}, AppBarState> {

    state: AppBarState = {
        windowState: ipcRenderer.sendSync("window-get-state"),
    };

    public shouldComponentUpdate(_: {}, nextState: AppBarState) {
        return nextState.windowState !== this.state.windowState;
    }

    private onMinimize = () => {
        ipcRenderer.send("window-minimize");
        this.setState({ windowState: "minimized" });
    };

    private onMaximize = () => {
        ipcRenderer.send("window-maximize");
        this.setState({ windowState: "maximized" });
    };

    private onRestore = () => {
        ipcRenderer.send("window-unmaximize");
        this.setState({ windowState: "normal" });
    };

    private onClose = () => {
        ipcRenderer.send("window-close");
    };

    public render() {

        const { windowState } = this.state;

        return (
            <Header>
                <DragBar>
                    {
                        process.platform !== "darwin" &&
                        [
                            <HeaderButton
                                name="minimize"
                                icon={<SvgIcon name="minimize" size={14} />}
                                onClick={this.onMinimize}
                                key="minimize"
                            />,
                            windowState === "maximized" ?
                            <HeaderButton
                                name="restore"
                                icon={<SvgIcon name="maximize" size={14} />}
                                onClick={this.onRestore}
                                key="restore"
                            /> :
                            <HeaderButton
                                name="maximize"
                                icon={<SvgIcon name="maximize" size={14} />}
                                onClick={this.onMaximize}
                                key="maximize"
                            />,
                            <HeaderButton
                                name="close"
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
