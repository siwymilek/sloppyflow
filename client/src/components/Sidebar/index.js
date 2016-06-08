import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChannels } from '../../actions/channels'

import SidebarHeader from './Header';
import SidebarFooter from './Footer';
import Channels from './Channels';

class Sidebar extends Component {

    componentDidMount() {
        this.props.dispatch(fetchChannels());
    }

    componentWillReceiveProps(nextProps) {
        const updateState = {};
        const channels = nextProps.channels.get('list');
        const currentChannelId = nextProps.app.get('currentChannel');

        if(this.state.channels !== channels) updateState.channels = channels;
        if(this.state.currentChannelId !== currentChannelId) updateState.currentChannelId = currentChannelId;

        this.setState(updateState);
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
            channels: [],
            currentChannelId: null
        }
    }

    render() {
        return (
            <div className="sidebar-component">
                <SidebarHeader/>
                <Channels channels={this.state.channels} currentChannelId={this.state.currentChannelId}/>
                <SidebarFooter/>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        channels: state.channels,
        app: state.app
    }
})(Sidebar);
