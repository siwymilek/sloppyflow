import React, { Component } from 'react';
import { Link } from 'react-router';

import { Session } from 'meteor/session';

export default class Channels extends Component {

    constructor() {
        super();

        this.state = {
            showChannels: 10,
            currentChannelId: null
        }
    }

    componentDidMount() {
        Tracker.autorun(() => {
            this.setState({
                currentChannelId: Session.get('channelId')
            });
        });
    }

    render() {
        let channels = [];

        this.props.channels.map((channel, i) => {
            if(this.state.showChannels > channels.length && channel.hidden == false) {
                let channelIcon = <i className="fa fa-hashtag" aria-hidden="true"/>;

                if(channel.isPrivate) {
                    channelIcon = <i className="fa fa-lock" aria-hidden="true"/>;
                }

                if(channel.badge != undefined && channel.badge > 0) {
                    channelIcon = <span className="badge">{channel.badge}</span>;
                }

                channels.push(
                    <li key={`channel-${channel.name}`} className={this.state.currentChannelId == channel.channelId ? 'active' : ''}>
                        <Link to={`/channel/${channel.name}`}>
                            <span>
                                <span className="icon">
                                    {channelIcon}
                                </span>
                                <span className="channelName">
                                    {channel.name}
                                </span>
                            </span>

                            <span className="options">
                                <i className="fa fa-eye-slash" aria-hidden="true"/>
                            </span>
                        </Link>
                    </li>
                );
            }
        });

        return (
            <div className="sidebar--channels" ref="channelsContainer">
                <div className="top">
                    <h4>Channels</h4>
                    <a href="#"><i className="fa fa-plus" aria-hidden="true"/></a>
                    <a href="#"><i className="fa fa-ellipsis-v more" aria-hidden="true"/></a>
                </div>

                <ul ref="channelsList">
                    {channels}
                </ul>
            </div>
        )
    }
}