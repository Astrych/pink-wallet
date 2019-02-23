
import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Content } from "./layout";

import Dashboard from "./dashboard";
import Send from "./send";
import Receive from "./receive";
import AddressBook from "./address-book";
import SideStakes from "./side-stakes";
import Transactions from "./transactions";
import Messages from "./messages";
import Settings from "./settings";


class AppContent extends Component {

    render() {

        return (
            <Content>
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
                <Suspense fallback={false}>
                    <Settings />
                </Suspense>
            </Content>
        );
    }
}

export default AppContent;
