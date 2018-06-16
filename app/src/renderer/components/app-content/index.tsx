
import React, { Component } from "react";
import { Tabs } from "antd";

import {

    Content,
    TabsBar,

} from "./layout";
import TabIcon from "./tab-icon";
import MenuButton from "./menu-button";
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
                <TabsBar defaultActiveKey="dashboard" tabBarExtraContent={<MenuButton />}>
                    <TabPane
                        tab={<TabIcon name="dashboard" title="Dashboard" />}
                        key="dashboard"
                    >
                        <Dashboard />
                    </TabPane>
                    <TabPane
                        tab={<TabIcon name="send" title="Send" />}
                        key="send"
                    >
                        <Send />
                    </TabPane>
                    <TabPane
                        tab={<TabIcon name="receive" title="Receive" />}
                        key="receive"
                    >
                        <Receive />
                    </TabPane>
                    <TabPane
                        tab={<TabIcon name="addressBook" title="Address Book" />}
                        key="addressBook"
                    >
                        <AddressBook />
                    </TabPane>
                    <TabPane
                        tab={<TabIcon name="sideStakes" title="Side Stakes" />}
                        key="side-stakes"
                    >
                        <SideStakes />
                    </TabPane>
                    <TabPane
                        tab={<TabIcon name="transactions" title="Transactions" />}
                        key="transactions"
                    >
                        <Transactions />
                    </TabPane>
                    <TabPane
                        tab={<TabIcon name="messages" title="Messages" />}
                        key="messages"
                    >
                        <Messages />
                    </TabPane>
                </TabsBar>
            </Content>
        );
    }
}

export default AppContent;
