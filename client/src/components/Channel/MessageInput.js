import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Store from '../../store';
import { sendMessage } from '../../actions/conversation';

import AutoSuggest from '../../common/AutoSuggest';
import Callbacks from '../../../../imports/lib/callbacks';

export default class MessageInput extends Component {

    constructor() {
        super();

        this.state = {
            value: '',
            inputName: 'message_'+Math.random().toString()
        }
    }

    componentDidMount() {
        Callbacks.add('openChannel', () => {
            ReactDOM.findDOMNode(this.refs.msgInput).focus();
        })
    }

    handleSendMessage(e) {
        e.preventDefault();

        const MsgInput = ReactDOM.findDOMNode(this.refs.msgInput);

        Store.dispatch(sendMessage(MsgInput.value.trim()));

        MsgInput.value = '';
    }

    render() {
        return (
            <footer>
                <div className="message-input-form-wrapper">
                    <form action="" autocomplete="off" onSubmit={this.handleSendMessage.bind(this)}>
                        <div className="ui-autosuggest-input-container">
                            <input
                                ref="msgInput"
                                type="text"
                                name={this.state.inputName}
                                placeholder="Message"
                                className="text--enter"
                                onKeyUp={(e) => {
                                    if(e.keyCode != 9 && e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13) {
                                        e.preventDefault();
                                        this.setState({value: e.target.value});
                                    }
                                }}
                                autocomplete="off"
                            />

                            <AutoSuggest
                                onChange={(suggestion) => {
                                    // this.setState({value: suggestion});
                                    this.refs.msgInput.value = suggestion;
                                }}
                                value={this.state.value}
                            />
                        </div>
                    </form>
                </div>
            </footer>
        );
    }
}
