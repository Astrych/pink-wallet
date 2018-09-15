
import React, { Component, ReactElement } from "react";

import { styled } from "@view-utils/styles";


const Content = styled.div<{ show: boolean }>`
    display: ${props => props.show ? "block" : "none" };
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
    background: white;
    box-shadow: 0 0 60px 10px rgba(0, 0, 0, 0.9);
    z-index: 1001;
`;

interface ModalProps {
    show: boolean;
    children: ReactElement<any> | ReactElement<any>[];
}

class Modal extends Component<ModalProps> {

    render() {

        const { show, children } = this.props;

        return(
            <Content show={show}>
                {children}
            </Content>
        );
    }
}

export default Modal;
