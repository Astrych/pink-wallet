
import { remote } from "electron";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { I18n } from "react-i18next";
import { Switch } from "antd";

import View from "../view";

import { changeTheme } from "../../../logic/settings/actions";
import { AppState } from "../../../logic/root-reducer";


interface DashboardProps {
    currentTheme: string;
    changeTheme: Function;
}

class Dashboard extends Component<DashboardProps> {

    window = remote.getCurrentWindow();

    private onThemeSwitch = () => {

        const { currentTheme, changeTheme } = this.props;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        changeTheme(newTheme);

        const newBackgroundColor = newTheme === "dark" ? "#3b3b3b" : "#eceaea";
        (this.window as any).setBackgroundColor(newBackgroundColor);
    };

    render() {

        const { currentTheme } = this.props;

        return (
            <View>
                <I18n ns="translations">
                    {(_, { i18n }) => <>
                        <Switch
                            checkedChildren="Light"
                            unCheckedChildren="Dark"
                            defaultChecked={currentTheme === "dark" ? false : true}
                            onChange={this.onThemeSwitch}
                            key="themeSwitcher"
                        />
                        <Switch
                            checkedChildren="PL"
                            unCheckedChildren="EN"
                            onChange={(isEN: boolean) => i18n.changeLanguage(isEN ? "pl": "en")}
                            key="langSwitcher"
                        />
                    </>}
                </I18n>
            </View>
        );
    }
}

interface StateProps {
    currentTheme: string;
}

function mapStateToProps(state: AppState): StateProps {

    return {
        currentTheme: state.settings.currentTheme,
    };
}

interface DispatchProps {
    changeTheme: Function;
}

function mapDispatchToProps(dispatch): DispatchProps {

    return bindActionCreators({ changeTheme }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Dashboard
);
