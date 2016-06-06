import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateChannelModal from '../Modals/CreateChannel';

import Button from 'react-bootstrap/lib/Button';

export default class Header extends Component {

    openModal(e) {
        e.preventDefault();
        this.refs.modal.show();
    }

    render() {
        return (
            <div className="sidebar--header">
                <div className="logo">
                    <Link to="/">
                        <h1>sloppyflow</h1>
                    </Link>
                </div>

                <div className="create-new">
                    <Button
                        bsStyle="info"
                        onClick={this.openModal.bind(this)}
                    >Create New</Button>
                </div>

                <CreateChannelModal ref="modal"/>
            </div>
        );
    }
}
