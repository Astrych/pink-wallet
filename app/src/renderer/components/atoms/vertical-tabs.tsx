
import React, { Component, ReactElement } from "react";
import SmoothScrollbar from "smooth-scrollbar";
import debounce from "lodash/debounce";

import { styled, css } from "@view-utils/styles";
import { TabContent, TabProps } from "./tab";
import { MenuButtonProps } from "./menu-button";


const Marker = styled.div`
    position: absolute;
    right: 0;
    border-width: 0px 1px 0px 1px;
    border-style: solid;
    border-color: ${props => props.theme.text.primary};
    transition: top 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), left 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), color 0.3s
                cubic-bezier(0.35, 0, 0.25, 1), width 0.3s
                cubic-bezier(0.35, 0, 0.25, 1);
    will-change: top, left, width, color;
`;

const ContentBar = styled.div<{ width: number }>`
    display: flex;
    flex-direction: column;
    margin-left: 0;
    height: 100%;
    width: ${props => props.width}px;
    color: ${props => props.theme.tabs.icons};
    background-color: ${props => props.theme.content.secondary};
`;

const prevNext = css`
    box-shadow: 0 2px 0 darkgrey inset,
                0 -2px 0 darkgrey inset;
`;

const TabsBar = styled.div<{ tabSize: number, markOverflow: boolean }>`
    position: relative;
    flex: 1;
    margin-top: 62px;
    margin-bottom: 32px;
    user-select: none;
    ${TabContent}, ${Marker} {
        height: ${props => props.tabSize}px;
    }
    ${props => props.markOverflow ? prevNext : null}
    /* Positions scroolbar on the left side of vertical tabs menu */
    .scrollbar-track-y {
        left: 0;
        width: 12px;
        .scrollbar-thumb {
            width: 12px;
        }
    }
`;

const ExtraContent = styled.div`
    text-align: center;
    > button {
        margin: auto;
        display: flex;
        align-items: center;
        padding-top: 18px;
        padding-bottom: 18px;
    }
`;

interface VerticalTabsProps {
    width: number;
    tabSize: number;
    defaultTab: string;
    children: ReactElement<TabProps>[];
    extraButton: ReactElement<MenuButtonProps>;
    tabsAction: (selectedTab: string) => ReactElement<any> | void;
    buttonAction?: () => ReactElement<any> | void;
}

interface VerticalTabsState {
    activeTabIndex: number;
    overflow: boolean;
}

class VerticalTabs extends Component<VerticalTabsProps, VerticalTabsState> {

    static defaultProps = {
        width: 125,
        tabSize: 65,
    }

    state = {
        activeTabIndex: this.setInitialActiveIndex(),
        overflow: false,
    };

    tabsBar: HTMLElement | null = null;
    scrollbar: SmoothScrollbar | null = null;
    debouncedResize = debounce(() => {
        this.checkOverflow();
    }, 200);

    componentDidMount() {
        this.scrollbar = SmoothScrollbar.init(this.tabsBar as HTMLElement);
        addEventListener("resize", this.debouncedResize);
        this.checkOverflow();
    }

    componentWillUnmount() {
        removeEventListener("resize", this.debouncedResize);
    }

    checkOverflow() {
        const element = this.tabsBar as HTMLElement;
        const overflow = element.offsetHeight < element.scrollHeight ||
                         element.offsetWidth < element.scrollWidth;
        this.setState({ overflow });
    }

    setInitialActiveIndex() {
        let initialIndex = 0;
        React.Children.forEach(this.props.children, (child, index) => {
            const { name } = (child as ReactElement<TabProps>).props;
            if (name === this.props.defaultTab) initialIndex = index;
        });
        return initialIndex;
    }

    onTabClick = (name: string, index: number) => {
        if (index !== this.state.activeTabIndex) {
            this.setState({ activeTabIndex: index });
            this.props.tabsAction(name);
        }
    };

    onButtonClick = () => {
        this.props.buttonAction && this.props.buttonAction();
    };

    render() {
        const { width, tabSize, children, extraButton } = this.props;
        const markerPosition = this.state.activeTabIndex*tabSize;

        return (
            <ContentBar width={width}>
                <TabsBar
                    tabSize={tabSize}
                    markOverflow={this.state.overflow}
                    ref={element => this.tabsBar = element}
                >
                    <Marker style={{ top: markerPosition }} />
                    {
                        React.Children.map(children, (child, index) => {
                            return React.cloneElement(child, {
                                onClick: this.onTabClick,
                                active: index === this.state.activeTabIndex,
                                index,
                            });
                        })
                    }
                </TabsBar>
                <ExtraContent>
                {
                    React.cloneElement(extraButton, {
                        onClick: this.onButtonClick,
                    })
                }
                </ExtraContent>
            </ContentBar>
        );
    }
}

export default VerticalTabs;
