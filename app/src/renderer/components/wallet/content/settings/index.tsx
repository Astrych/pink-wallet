
import { remote } from "electron";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { I18n } from "react-i18next";

import Modal from "@components/atoms/modal";
import ComboBox from "@components/atoms/combo-box";
import { changeTheme, hideSettings } from "@view-logic/settings/actions";
import { AppState } from "@view-logic/root-reducer";
import themes from "@view-logic/theme";


interface SettingsProps {
    currentTheme: string;
    changeTheme: Function;
    settingsOpened: boolean;
    hideSettings: Function;
}

class Settings extends Component<SettingsProps> {

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

    private closeSettings = () => {
        this.props.hideSettings();
    };

    render() {

        const { currentTheme, settingsOpened } = this.props;

        for (const item of this.themesList) {
            if (item.value === currentTheme) {
                item.selected = true;
                break;
            }
        }

        return (
            <Modal show={settingsOpened}>
                <I18n ns="main">
                    {(t, { i18n }) => <>
                        <h1>SETTINGS MODAL</h1>
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
                        <button onClick={this.closeSettings}>CLOSE</button>
                    </>}
                </I18n>
            </Modal>
        );
    }
}


interface StateProps {
    currentTheme: string;
    settingsOpened: boolean;
}

function mapStateToProps(state: AppState): StateProps {

    return {
        currentTheme: state.settings.currentTheme,
        settingsOpened: state.settings.settingsOpened,
    };
}

interface DispatchProps {
    changeTheme: Function;
    hideSettings: Function;
}

function mapDispatchToProps(dispatch): DispatchProps {

    return bindActionCreators({ changeTheme, hideSettings }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Settings
);
