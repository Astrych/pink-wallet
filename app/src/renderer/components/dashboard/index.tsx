
import { remote } from "electron";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "antd";

import TabContent from "../tab-content";
import { changeTheme } from "../../logic/settings/actions";


function mapStateToProps(state, ownProps) {

    return {
        ...ownProps, // WORKARONUD FOR STRANGE TYPINGS BUG.
        currentTheme: state.settings.currentTheme,
    };
}

function mapDispatchToProps(dispatch: Function) {

    return {
        switchTheme: (theme) => {
            dispatch(changeTheme(theme));
        }
    };
}

interface DashboardProps {
    currentTheme,
    switchTheme: Function
}

class Dashboard extends Component<DashboardProps> {

    window = remote.getCurrentWindow();

    private onThemeSwitch = () => {

        const { currentTheme } = this.props;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        this.props.switchTheme(newTheme);
        const newBackgroundColor = newTheme === "dark" ? "#484848" : "#eceaea";
        (this.window as any).setBackgroundColor(newBackgroundColor);
    };

    render() {
        return (
            <TabContent>
                <Switch
                    checkedChildren="Light"
                    unCheckedChildren="Dark"
                    onChange={this.onThemeSwitch}
                />
            </TabContent>
        );
    }
}

export default connect<DashboardProps>(
    mapStateToProps,
    mapDispatchToProps
)(
    Dashboard
);
