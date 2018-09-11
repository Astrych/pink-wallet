
import React, { Component, ReactElement } from "react";
import {

    withRouter,
    RouteComponentProps

} from "react-router";

import { Sidebar } from "./layout";
import VerticalTabs from "@components/atoms/vertical-tabs";
import Tab from "@components/atoms/tab";
import MenuButton from "@components/atoms/menu-button";


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
            history.push(route);
        }
    };

    render() {
        return(
            <Sidebar>
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
            </Sidebar>
        );
    }
}

export default withRouter(ViewSwitcher);
