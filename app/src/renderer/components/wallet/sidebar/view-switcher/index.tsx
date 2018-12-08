
import React, { Component, ReactElement } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import {

    withRouter,
    RouteComponentProps,

} from "react-router";

import { Sidebar } from "./layout";
import VerticalTabs from "@components/atoms/vertical-tabs";
import { TabProps } from "@components/atoms/tab";
import { MenuButtonProps } from "@components/atoms/menu-button";
import { showSettings } from "@view-logic/settings/actions";


interface ViewSwitcherProps extends RouteComponentProps<any> {
    extraButton: ReactElement<MenuButtonProps>;
    children: ReactElement<TabProps>[];
    showSettings: Function;
}

interface ViewSwitcherState {
    route: string;
}

class ViewSwitcher extends Component<ViewSwitcherProps, ViewSwitcherState> {

    private redirect = (route: string) => {
        const { location, history } = this.props;

        if (route !== location.pathname) {
            history.push(route);
        }
    };

    private showSettings = () => {
        this.props.showSettings();
    };

    render() {
        const { extraButton, children } = this.props;

        return(
            <Sidebar>
                <VerticalTabs
                    defaultTab="dashboad"
                    extraButton={extraButton}
                    tabsAction={
                        selectedTab => {
                            this.redirect(`/${selectedTab}`);
                        }
                    }
                    buttonAction={
                        () => {
                            this.showSettings();
                        }
                    }
                >
                    {children}
                </VerticalTabs>
            </Sidebar>
        );
    }
}


interface DispatchProps {
    showSettings: Function;
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({ showSettings }, dispatch);
}

export default withRouter(connect(
    () => ({}),
    mapDispatchToProps
)(
    ViewSwitcher
));
