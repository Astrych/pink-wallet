
import React, { Component, ReactElement } from "react";
import {

    withRouter,
    RouteComponentProps

} from "react-router";

import { Sidebar } from "./layout";
import VerticalTabs from "@components/atoms/vertical-tabs";
import Tab from "@components/atoms/tab";
import { MenuButtonProps } from "@components/atoms/menu-button";


interface ViewSwitcherProps extends RouteComponentProps<any> {
    extraButton: ReactElement<MenuButtonProps>;
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
                            console.log("SHOW SETTINGS MODAL!");
                        }
                    }
                >
                    {children}
                </VerticalTabs>
            </Sidebar>
        );
    }
}

export default withRouter(ViewSwitcher);
