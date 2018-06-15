
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "antd";

import {

    Content,

} from "./layout";
import { changeTheme } from "../../logic/settings/actions";


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
