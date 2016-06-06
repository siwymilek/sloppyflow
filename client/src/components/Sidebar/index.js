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
        const channels = nextProps.channels.get('list');
        
        if(this.state.channels === channels) return;
        
        this.setState({channels});
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
            channels: []
        }
    }

    render() {
        return (
            <div className="sidebar-component">
                <SidebarHeader/>
                <Channels channels={this.state.channels}/>
                <SidebarFooter/>
            </div>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        channels: state.channels
    }
})(Sidebar);
