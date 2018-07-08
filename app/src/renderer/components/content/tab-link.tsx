
import React, { Component } from "react";
import {

    withRouter,
    RouteComponentProps

} from "react-router";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";

import SvgIcon from "../atoms/svg-icon";


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
            <Tooltip placement="right" title={title} mouseEnterDelay={0.8}>
                <Link to={to} onClick={this.onLinkClick}>
                    <SvgIcon name={name} size={31} />
                </Link>
            </Tooltip>
        );
    }
}

export default withRouter(TabLink);
