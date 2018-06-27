
import React, { Component } from "react";
import { I18n } from "react-i18next";
import { HashRouter as Router, Route } from "react-router-dom";
import { Tabs } from "antd";

import { TabsBar } from "./layout";
import MenuButton from "./menu-button";
import TabLink from "./tab-link";
import Dashboard from "./dashboard";
import Send from "./send";
import Receive from "./receive";
import AddressBook from "./address-book";
import SideStakes from "./side-stakes";
import Transactions from "./transactions";
import Messages from "./messages";


const TabPane = Tabs.TabPane;

class AppContent extends Component {

    render() {

        return (
            <Router>
                <I18n ns="translations">
                    {t => (
                        <TabsBar
                            tabPosition="left"
                            defaultActiveKey="dashboard"
                            tabBarExtraContent={<MenuButton name="settings" />}
                        >
                            <TabPane
                                tab={<TabLink to="/" name="dashboard" title={t("tabs.dashboard")} />}
                                key="dashboard"
                            >
                                <Route exact path="/" component={Dashboard} />
                            </TabPane>
                            <TabPane
                                tab={<TabLink to="/send" name="send" title={t("tabs.send")} />}
                                key="send"
                            >
                                <Route exact path="/send" component={Send} />
                            </TabPane>
                            <TabPane
                                tab={<TabLink to="/receive" name="receive" title={t("tabs.receive")} />}
                                key="receive"
                            >
                                <Route exact path="/receive" component={Receive} />
                            </TabPane>
                            <TabPane
                                tab={<TabLink to="/addressBook" name="addressBook" title={t("tabs.addressBook")} />}
                                key="addressBook"
                            >
                                <Route exact path="/addressBook" component={AddressBook} />
                            </TabPane>
                            <TabPane
                                tab={<TabLink to="/sideStakes" name="sideStakes" title={t("tabs.sideStakes")} />}
                                key="sideStakes"
                            >
                                <Route exact path="/sideStakes" component={SideStakes} />
                            </TabPane>
                            <TabPane
                                tab={<TabLink to="/transactions" name="transactions" title={t("tabs.transactions")} />}
                                key="transactions"
                            >
                                <Route exact path="/transactions" component={Transactions} />
                            </TabPane>
                            <TabPane
                                tab={<TabLink to="/messages" name="messages" title={t("tabs.messages")} />}
                                key="messages"
                            >
                                <Route exact path="/messages" component={Messages} />
                            </TabPane>
                        </TabsBar>
                    )}
                </I18n>
            </Router>
        );
    }
}

export default AppContent;
