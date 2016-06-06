import React, { Component } from 'react';
import AutoSuggest from '../../common/AutoSuggest';

export default class MessageInput extends Component {

    constructor() {
        super();

        this.state = {
            value: '',
            inputName: 'message_'+Math.random().toString()
        }
    }

    render() {
        return (
            <footer>
                <div className="message-input-form-wrapper">
                    <form action="" autocomplete="off" onSubmit={(e) => e.preventDefault()}>
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
