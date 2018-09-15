
import { remote } from "electron";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { I18n } from "react-i18next";

import View from "../view";

import ComboBox from "@components/atoms/combo-box";
import { changeTheme } from "@view-logic/settings/actions";
import { AppState } from "@view-logic/root-reducer";
import themes from "@view-logic/theme";


interface DashboardProps {
    currentTheme: string;
    changeTheme: Function;
}

class Dashboard extends Component<DashboardProps> {

    window = remote.getCurrentWindow();

    // TODO: Set it based on lang definitions.
    langList = [
        { id: 1, title: "English", selected: true, value: "en" },
        { id: 2, title: "Polski", selected: false, value: "pl" },
    ];

    // TODO: Set it based on theme object.
    themesList = [
        { id: 1, title: "Dark", selected: true, value: "dark" },
        { id: 2, title: "Light", selected: false, value: "light" },
    ];

    private onThemeSwitch = (_, newTheme: string) => {
        this.props.changeTheme(newTheme);

        const newBackgroundColor = themes[newTheme].content.primary;
        (this.window as any).setBackgroundColor(newBackgroundColor);
    };

    render() {

        const { currentTheme } = this.props;

        for (const item of this.themesList) {
            if (item.value === currentTheme) {
                item.selected = true;
                break;
            }
        }

        return (
            <View>
                <I18n ns="main">
                    {(t, { i18n }) => <>
                        <ComboBox
                            list={this.langList}
                            action={(_, value: string) => i18n.changeLanguage(value)}
                            placeholder={t("settings.selectLang")}
                            minWidth={220}
                        />
                        <ComboBox
                            list={this.themesList}
                            action={this.onThemeSwitch}
                            placeholder={t("settings.selectTheme")}
                            minWidth={220}
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
