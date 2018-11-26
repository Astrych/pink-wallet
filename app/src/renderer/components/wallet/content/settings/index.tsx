
import { ipcRenderer } from "electron";
import React, { Component } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { NamespacesConsumer as Translate } from "react-i18next";
import R from "ramda";

import { Content, Header, Form, Label, Button } from "./layout";
import Modal from "@components/atoms/modal";
import ComboBox from "@components/atoms/combo-box";
import { changeTheme, changeLanguage, hideSettings } from "@view-logic/settings/actions";
import { AppState } from "@view-logic/root-reducer";
import themes from "@view-logic/theme";
import i18n from "@view-utils/locales";


interface SettingsProps {
    currentTheme: string;
    changeTheme: Function;
    currentLanguage: string;
    changeLanguage: Function;
    settingsOpened: boolean;
    hideSettings: Function;
}

class Settings extends Component<SettingsProps> {

    langList = [
        { id: 1, title: "English", selected: false, value: "en" },
        { id: 2, title: "Polski", selected: false, value: "pl" },
    ];

    themesList = [
        { id: 1, title: "settings.themes.dark", selected: true, value: "dark" },
        { id: 2, title: "settings.themes.light", selected: false, value: "light" },
    ];

    componentDidMount() {
        interface InitState {
            theme: string;
            language: string;
        }

        ipcRenderer.on("app-set-init-state", (_: Electron.Event, data: InitState) => {
            this.props.changeTheme(data.theme);
            this.props.changeLanguage(data.language);
            i18n.changeLanguage(data.language);

            const el = R.find(R.propEq("value", data.language))(this.langList);
            if (el) el.selected = true;
        });
        ipcRenderer.send("app-get-init-state");
    }

    private getThemesList(t: i18n.TranslationFunction) {
        const newList = R.clone(this.themesList);
        for (const el of newList) el.title = t(el.title);
        return newList;
    }

    private onThemeSwitch = (_: number, newTheme: string) => {
        this.props.changeTheme(newTheme);
        ipcRenderer.send("app-set-theme", {
            theme: newTheme,
            color: themes[newTheme].content.primary,
        });
    };

    private onLanguageSwitch = (newLanguage: string) => {
        this.props.changeLanguage(newLanguage);
        ipcRenderer.send("app-set-language", newLanguage);
    };

    private closeSettingsModal = () => {
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
                <Translate ns="main">
                    {(t, { i18n }) => <Content>

                        <Header>{t("settings.header")}</Header>
                        <Form>
                            <Label>{t("settings.langLabel")}</Label>
                            <ComboBox
                                list={this.langList}
                                action={(_, value: string) => {
                                    this.onLanguageSwitch(value);
                                    i18n.changeLanguage(value);
                                }}
                                placeholder={t("settings.langPlaceholder")}
                                minWidth={220}
                            />
                            <Label>{t("settings.themeLabel")}</Label>
                            <ComboBox
                                list={this.getThemesList(t)}
                                action={this.onThemeSwitch}
                                placeholder={t("settings.themePlaceholder")}
                                minWidth={220}
                            />
                            <Button onClick={this.closeSettingsModal}>
                                {t("settings.close")}
                            </Button>
                        </Form>
                    </Content>}
                </Translate>
            </Modal>
        );
    }
}


interface StateProps {
    currentTheme: string;
    currentLanguage: string;
    settingsOpened: boolean;
}

function mapStateToProps(state: AppState): StateProps {

    return {
        currentTheme: state.settings.currentTheme,
        currentLanguage: state.settings.currentLanguage,
        settingsOpened: state.settings.settingsOpened,
    };
}

interface DispatchProps {
    changeTheme: Function;
    changeLanguage: Function;
    hideSettings: Function;
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {

    return bindActionCreators({ changeTheme, changeLanguage, hideSettings }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Settings
);
