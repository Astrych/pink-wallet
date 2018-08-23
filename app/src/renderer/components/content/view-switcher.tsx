
import React, { Component, ReactElement } from "react";
import {

    withRouter,
    RouteComponentProps

} from "react-router";

import VerticalTabs from "../atoms/vertical-tabs";
import Tab from "../atoms/tab";
import MenuButton from "../atoms/menu-button";


interface ViewSwitcherProps extends RouteComponentProps<ViewSwitcherProps> {
    children: ReactElement<Tab>[];
}

interface ViewSwitcherState {
    route: string;
}

class ViewSwitcher extends Component<ViewSwitcherProps, ViewSwitcherState> {

    private redirect = route => {
        const { location, history } = this.props;

        if (route !== location.pathname) {
            console.log(route, location);
            history.push(route);
        }
    };

    render() {
        return(
            <VerticalTabs
                defaultTab="dashboad"
                extraButton={<MenuButton name="settings" />}
                action={
                    selectedTab => {
                        this.redirect(`/${selectedTab}`);
                    }
                }
            >
                {this.props.children}
            </VerticalTabs>
        );
    }
}

export default withRouter(ViewSwitcher);
