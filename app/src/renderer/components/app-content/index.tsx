
import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Switch } from "antd";

import {

    Content,
    TabsBar,

} from "./layout";
import TabIcon from "./tab-icon";
import { changeTheme } from "../../logic/settings/actions";


const TabPane = Tabs.TabPane;

function mapStateToProps(state, ownProps) {

    return {
        ...ownProps, // WORKARONUD FOR STRANGE TYPINGS BUG.
        currentTheme: state.settings.currentTheme,
    };
}

function mapDispatchToProps(dispatch: Function) {

    return {
        switchTheme: (theme) => {
            dispatch(changeTheme(theme));
        }
    };
}

interface AppContentProps {
    currentTheme,
    switchTheme: Function
}

class AppContent extends Component<AppContentProps> {

    private onThemeSwitch = () => {

        const { currentTheme } = this.props;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        this.props.switchTheme(newTheme);
    };

    render() {

        return (
            <Content>
                <TabsBar defaultActiveKey="dashboard">
                    <TabPane
                        tab={<TabIcon name="dashboard" title="Dashboard" />}
                        key="dashboard"
                    />
                    <TabPane
                        tab={<TabIcon name="send" title="Send" />}
                        key="send"
                    />
                    <TabPane
                        tab={<TabIcon name="receive" title="Receive" />}
                        key="receive"
                    />
                    <TabPane
                        tab={<TabIcon name="addressBook" title="Address Book" />}
                        key="addressBook"
                    />
                    <TabPane
                        tab={<TabIcon name="sideStakes" title="Side Stakes" />}
                        key="side-stakes"
                    />
                    <TabPane
                        tab={<TabIcon name="transactions" title="Transactions" />}
                        key="transactions"
                    />
                    <TabPane
                        tab={<TabIcon name="messages" title="Messages" />}
                        key="messages"
                    />
                </TabsBar>
                <Switch
                    checkedChildren="Light"
                    unCheckedChildren="Dark"
                    onChange={this.onThemeSwitch}
                />
            </Content>
        );
    }
}

export default connect<AppContentProps>(
    mapStateToProps,
    mapDispatchToProps
)(
    AppContent
);
