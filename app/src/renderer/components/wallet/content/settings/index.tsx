
import React, { Component } from "react";

import Modal from "@components/atoms/modal";


export default class Settings extends Component {

    render() {
        return (
            <Modal show={true}>
                <h1>SETTINGS MODAL</h1>
                <button>CLOSE</button>
            </Modal>
        );
    }
}
