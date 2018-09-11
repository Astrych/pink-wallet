
import React, { Component } from "react";
import { I18n } from "react-i18next";

import ViewSwitcher from "./view-switcher";
import Tab from "@components/atoms/tab";


class Sidebar extends Component {

    render() {
        return (
            <I18n ns="main">
                {t => <>
                    <ViewSwitcher>
                        <Tab name="dashboard" description={t("tabs.dashboard")} />
                        <Tab name="send" description={t("tabs.send")} />
                        <Tab name="receive" description={t("tabs.receive")} />
                        <Tab name="addressBook" description={t("tabs.addressBook")} />
                        <Tab name="sideStakes" description={t("tabs.sideStakes")} />
                        <Tab name="transactions" description={t("tabs.transactions")} />
                        <Tab name="messages" description={t("tabs.messages")} />
                    </ViewSwitcher>
                </>}
            </I18n>
        );
    }
}

export default Sidebar;
