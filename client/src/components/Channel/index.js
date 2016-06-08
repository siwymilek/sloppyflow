import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Session } from 'meteor/session';

import Header from './Header';
import Conversation from './../Conversation';
import MessageInput from './MessageInput';

class Channel extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="channel-container">
                <Header/>
                <Conversation/>
                <MessageInput/>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        channels: state.channels
    }
})(Channel);