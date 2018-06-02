
import { remote, ipcRenderer } from "electron";
import React from "react";
import styled, { injectGlobal } from "styled-components";
import {
    
    WindowMinimize,
    Square as WindowMaximize,
    Clone as WindowRestore,
    StyledIcon

} from "styled-icons/fa-regular";
import { X as WindowClose } from "styled-icons/octicons";
import { Layout, Row, Col } from "antd";


const WindowButton = styled.button`
    user-select: none;
    -webkit-app-region: no-drag;
    background-color: transparent;
    border: none;
    outline: none;
    margin-right: 10px;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0;
    height: 25px;
    color: white;

    &:hover {
        color: grey;
    }
    &:active {
        color: pink;
    }
`;

function renderButton(

    name: string,
    Icon: StyledIcon,
    onClick: React.EventHandler<React.MouseEvent<any>>,
    styles: object={}

) {
    const title = name[0].toUpperCase() + name.substring(1);

    return (
        <WindowButton aria-label={name} title={title} tabIndex={-1} onClick={onClick}>
            <Icon
                size={25}
                color="inherit"
                style={{ verticalAlign: "baseline", ...styles }}
            />
        </WindowButton>
    );
}

const AppBar = styled(Layout.Header)`
    background-color: black;
    max-height: 35px;
    padding: 0;
`;

const BarRow = styled(Row)`
    background-color: black;
    margin: 5px;
    height: 25px;
    -webkit-app-region: drag;
    user-select: none;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 23px;
`;

const LogoCol = styled(Col)`
    text-align: left;
`;

const TitleCol = styled(Col)`
    text-align: center;
`;

const ButtonsCol = styled(Col)`
    text-align: right;
`;

const PinkIcon = styled.img`
    height: 25px;
    vertical-align: baseline;
`;


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

        const min = renderButton("minimize", WindowMinimize, this.onMinimize);
        const restore = renderButton("restore", WindowRestore, this.onRestore, {
            transform: "rotate(90deg) scaleY(-1)"
        });
        const maximize = renderButton("maximize", WindowMaximize, this.onMaximize)
        const close = renderButton("close", WindowClose, this.onClose);

        return (
            <AppBar>
                <BarRow type="flex" justify="center">
                    <LogoCol span={8}>
                        <PinkIcon src="./img/icon-256x256.png" />
                    </LogoCol>
                    <TitleCol span={8}>
                        <span style={{ color: "white", fontSize: 19, fontWeight: 500 }}>
                            {this.appTitle}
                        </span>
                    </TitleCol>
                    <ButtonsCol span={8}>
                        {min}
                        {windowState === "maximized" ? restore : maximize}
                        {close}
                    </ButtonsCol>
                </BarRow>
            </AppBar>
        );
    }
}

export default TitleBar;
