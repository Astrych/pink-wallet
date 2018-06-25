
import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import TabIcon from "./tab-icon";


interface TabLinkProps extends RouteComponentProps<TabLinkProps> {
    to: string;
    name: string;
    title: string;
}

class TabLink extends Component<TabLinkProps> {

    private onLinkClick = e => {

        const { to, location } = this.props;

        if (to === location.pathname) {
            e.preventDefault();
        }
    };

    render() {

        const { to, name, title } = this.props;

        return (
            <Link to={to} onClick={this.onLinkClick}>
                <TabIcon name={name} title={title} />
            </Link>
        );
    }
}

export default withRouter(TabLink);
