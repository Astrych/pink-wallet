
import React, { Component } from "react";
import { I18n } from "react-i18next";
import { MemoryRouter } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import { Content } from "./layout";
import ViewSwitcher from "./view-switcher";
import Tab from "../atoms/tab";
import Dashboard from "./dashboard";
import Send from "./send";
import Receive from "./receive";
import AddressBook from "./address-book";
import SideStakes from "./side-stakes";
import Transactions from "./transactions";
import Messages from "./messages";


class AppContent extends Component {

    render() {

        return (
            <Content>
                <MemoryRouter>
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
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/send" component={Send} />
                                <Route path="/receive" component={Receive} />
                                <Route path="/addressBook" component={AddressBook} />
                                <Route path="/sideStakes" component={SideStakes} />
                                <Route path="/transactions" component={Transactions} />
                                <Route path="/messages" component={Messages} />
                                <Redirect from="/" exact to="/dashboard" />
                            </Switch>
                        </>}
                    </I18n>
                </MemoryRouter>
            </Content>
        );
    }
}

export default AppContent;
