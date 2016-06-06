import React, { Component } from 'react';
import Modal from '../../../common/Modal';

import CreateChannelForm from '../../../forms/CreateChannel';

import Store from '../../../store';
import { createChannel } from '../../../actions/channels';
import { browserHistory } from 'react-router';

export default class CreateChannel extends Component {

    constructor() {
        super();

        this.state = {
            formHidden: true
        }
    }

    show() {
        this.setState({
            formHidden: false
        }, () => {
            this.refs.modal.show();
        });
    }

    handleFormSubmit(values) {
        return new Promise(resolve => {

            const subscribeStore = Store.subscribe(() => {
                const channelState = Store.getState().createChannel;
                const channelName = channelState.get('channelName');

                if(channelName) {
                    browserHistory.push('/channel/'+channelName);
                    this.refs.modal.hide();
                }


                if(!channelState.get('isProcessing')) subscribeStore();
            });

            const {name, username, type, isPrivate} = values;
            Store.dispatch(createChannel(name, username, type, isPrivate));
            resolve();
        });
    }
    
    render() {
        return (
            <Modal ref="modal" className="sf--ui-modal" onClosed={() => {
                this.setState({
                    formHidden: true
                });
            }}>
                <h3>{this.state.isPrivate ? 'Create a new private channel' : 'Create a new public channel'}</h3>

                {this.state.formHidden ? null : <CreateChannelForm onSubmit={this.handleFormSubmit.bind(this)}/>}
            </Modal>
        );
    }
}