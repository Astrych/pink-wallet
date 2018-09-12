
import React, { Component } from "react";
import { AngleUp } from "styled-icons/fa-solid/AngleUp";
import { AngleDown } from "styled-icons/fa-solid/AngleDown";

import { styled } from "@view-utils/styles";


const Content = styled.div`
    background-color: red;
`;

const Header = styled.div`

`;

const Title = styled.span`

`;

const List = styled.ul`

`;

const ListItem = styled.li`

`;

interface Item {
    id: number;
    title: string;
    selected: boolean;
    key: string;
}

interface ComboBoxProps {
    list: Item[];
    headerTitle: string;
    action: (id: number) => void;
}

interface ComboBoxState {
    selectedId: number;
    headerTitle: string;
    listOpen: boolean;
}

class ComboBox extends Component<ComboBoxProps, ComboBoxState> {

    static defaultProps = {
        headerTitle: "Select...",
    }

    state = {
        ...this.setInitialState(),
        listOpen: false,
    };

    setInitialState() {
        for (const o of this.props.list) {
            if (o.selected) return { selectedId: o.id, headerTitle: o.title };
        }
        return { selectedId: 0, headerTitle: this.props.headerTitle };
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    selectItem(id: number, title: string) {
        this.setState({ selectedId: id, headerTitle: title });
        this.toggleList();
    }

    render() {
        const { list, action } = this.props;
        const { listOpen, headerTitle } = this.state;

        return (
            <Content>
                <Header onClick={() => this.toggleList()}>
                    <Title>{headerTitle}</Title>
                    {
                        listOpen ? <AngleUp size={30} /> : <AngleDown size={30} />
                    }
                </Header>
                {
                    listOpen &&
                    <List>
                        {list.map(item => (
                            <ListItem
                                key={item.id}
                                onClick={() => {
                                    this.selectItem(item.id, item.title);
                                    action(item.id);
                                }}
                            >
                                {item.title}
                            </ListItem>
                        ))}
                    </List>
                }
            </Content>
        );
    }
}

export default ComboBox;
