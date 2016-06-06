import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Session } from 'meteor/session';

import Header from './Header';
import Conversation from './../Conversation';
import MessageInput from './MessageInput';

import { Channels } from '../../../../imports/models/Channel';

class Channel extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setChannelId(nextProps);
    }

    componentDidMount() {
        this.setChannelId(this.props);
    }

    setChannelId(props) {
        const {channelName} = props.params;

        Meteor.subscribe('getChannel', channelName, () => {
            const channel = Channels.findOne({channelName});
            Session.set('channelId', channel._id);
        });
    }

    componentWillUnmount() {
        Session.set('channelId', null);
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