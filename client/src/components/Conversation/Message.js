import React, { Component } from 'react';
import Avatar from '../../common/Avatar';

class Message extends Component {

    constructor() {
        super();
    }

    render() {
        const {avatar, username, pvUsername, message} = this.props;

        return (
            <li className={'message-container'+(pvUsername == username ? ' sequential' : '')}>
                <Avatar
                    photo={avatar}
                    size={40}
                    style={{marginRight: 10}}
                    radiusRatio={0.2}
                />

                <div>
                    <p><span className="username">{username}</span> / 16:12</p>
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
