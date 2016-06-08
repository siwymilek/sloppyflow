import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './Message';

class Conversation extends Component {
    
    constructor() {
        super();
        
        this.state = {
            messages: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            messages: nextProps.messages.get('list')
        });
    }

    render() {
        const messages = this.state.messages;
        return (
            <div className="conversation-container">
                <ul className="polite">
                    {messages.map((message, i) => {
                        let pvUsername = null;
                        if(messages[i-1] != undefined) pvUsername = messages[i-1].user.username;
                        return <Message key={`message-${i}`} {...message} pvUsername={pvUsername}/>
                    })}
                </ul>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        users: state.users,
        messages: state.messages
    }
})(Conversation);