
import React, { Component } from "react";
import { NamespacesConsumer as Translate } from "react-i18next";

import ViewSwitcher from "./view-switcher";
import Tab from "@components/atoms/tab";
import MenuButton from "@components/atoms/menu-button";


class Sidebar extends Component {

    render() {
        return (
            <Translate ns="main">
                {t => <>
                    <ViewSwitcher
                        extraButton={
                            <MenuButton name="settings" description={t("tabs.settings")} />
                        }
                    >
                        <Tab name="dashboard" description={t("tabs.dashboard")} />
                        <Tab name="send" description={t("tabs.send")} />
                        <Tab name="receive" description={t("tabs.receive")} />
                        <Tab name="addressBook" description={t("tabs.addressBook")} />
                        <Tab name="sideStakes" description={t("tabs.sideStakes")} />
                        <Tab name="transactions" description={t("tabs.transactions")} />
                        <Tab name="messages" description={t("tabs.messages")} />
                    </ViewSwitcher>
                </>}
            </Translate>
        );
    }
}

export default Sidebar;
