
import React, { Component, ReactElement } from "react";

import { styled } from "@view-utils/styles";


const Overlay = styled.div<{ show: boolean }>`
    display: ${props => props.show ? "block" : "none" };
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    background: ${props => props.theme.content.secondary};
    box-shadow: 0 0 50px 10px rgba(0, 0, 0, 0.7 );
`;

interface ModalProps {
    show: boolean;
    children: ReactElement<any> | ReactElement<any>[];
}

class Modal extends Component<ModalProps> {

    render() {

        const { show, children } = this.props;

        return(
            <Overlay show={show}>
                <Content>{children}</Content>
            </Overlay>
        );
    }
}

export default Modal;
