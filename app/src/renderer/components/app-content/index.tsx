
import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { Tabs } from "antd";

import {

    Content,
    TabsBar,

} from "./layout";
import MenuButton from "./menu-button";
import TabLink from "./tab-link";
import Dashboard from "../dashboard";
import Send from "../send";
import Receive from "../receive";
import AddressBook from "../address-book";
import SideStakes from "../side-stakes";
import Transactions from "../transactions";
import Messages from "../messages";


const TabPane = Tabs.TabPane;

class AppContent extends Component {

    render() {

        return (
            <Content>
                <Router>
                    <TabsBar defaultActiveKey="dashboard" tabBarExtraContent={<MenuButton />}>
                        <TabPane
                            tab={<TabLink to="/" name="dashboard" title="Dashboard" />}
                            key="dashboard"
                        >
                            <Route exact path="/" component={Dashboard} />
                        </TabPane>
                        <TabPane
                            tab={<TabLink to="/send" name="send" title="Send" />}
                            key="send"
                        >
                            <Route exact path="/send" component={Send} />
                        </TabPane>
                        <TabPane
                            tab={<TabLink to="/receive" name="receive" title="Receive" />}
                            key="receive"
                        >
                            <Route exact path="/receive" component={Receive} />
                        </TabPane>
                        <TabPane
                            tab={<TabLink to="/addressBook" name="addressBook" title="Address Book" />}
                            key="addressBook"
                        >
                            <Route exact path="/addressBook" component={AddressBook} />
                        </TabPane>
                        <TabPane
                            tab={<TabLink to="/sideStakes" name="sideStakes" title="Side Stakes" />}
                            key="sideStakes"
                        >
                            <Route exact path="/sideStakes" component={SideStakes} />
                        </TabPane>
                        <TabPane
                            tab={<TabLink to="/transactions" name="transactions" title="Transactions" />}
                            key="transactions"
                        >
                            <Route exact path="/transactions" component={Transactions} />
                        </TabPane>
                        <TabPane
                            tab={<TabLink to="/messages" name="messages" title="Messages" />}
                            key="messages"
                        >
                            <Route exact path="/messages" component={Messages} />
                        </TabPane>
                    </TabsBar>
                </Router>
            </Content>
        );
    }
}

export default AppContent;
