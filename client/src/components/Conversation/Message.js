import React, { Component } from 'react';
import Avatar from '../../common/Avatar';
import { relativeTime } from '../../utils/time.helpers';

class Message extends Component {

    constructor() {
        super();
    }

    render() {
        // const {avatar, username, pvUsername, message} = this.props;
        const {message, user: {username}, pvUsername, type, publishedAt} = this.props;

        return (
            <li className={'message-container'+(pvUsername == username ? ' sequential' : '')}>
                <Avatar
                    photo={'http://forum.ravia.eu/images/users/avatar/Cycko_Party.jpg'}
                    size={40}
                    style={{marginRight: 10}}
                    radiusRatio={0.2}
                />

                <div>
                    <p><span className="username">{username}</span> / {relativeTime(publishedAt)}</p>
                    <div className="text">
                        {message}
                    </div>
                </div>
            </li>
        );
    }
}

Message.propTypes = {
    avatar: React.PropTypes.string,
    username: React.PropTypes.string,
    pvUsername: React.PropTypes.string,
    message: React.PropTypes.string
};

export default Message;
