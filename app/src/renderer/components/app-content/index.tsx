
import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Switch } from "antd";

import {

    Content,
    TabBar

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
                <TabBar defaultActiveKey="dashboard">
                    <TabPane tab={<TabIcon name="dashboard" />} key="dashboard" />
                    <TabPane tab={<TabIcon name="send" />} key="send" />
                    <TabPane tab={<TabIcon name="receive" />} key="receive" />
                    <TabPane tab={<TabIcon name="addressBook" />} key="address-book" />
                    <TabPane tab={<TabIcon name="sideStakes" />} key="side-stakes" />
                    <TabPane tab={<TabIcon name="transactions" />} key="transactions"/>
                    <TabPane tab={<TabIcon name="messages" />} key="messages" />
                </TabBar>
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
