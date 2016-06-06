import React, { Component } from 'react';
import { connect } from 'react-redux';

import Message from './Message';

class Conversation extends Component {

    messages() {
        const messages = [];
        for(let i = 0; i < 10; i++) {
            messages.push(getMessage());
        }
        
        return messages;
    }

    componentWillReceiveProps(nextProps) {
        
    }

    componentDidMount() {
        // console.log(this.props.dispatch);
    }

    render() {
        const messages = this.messages();
        return (
            <div className="conversation-container">
                <ul className="polite">
                    {messages.map((message, i) => {
                        let pvUsername = null;
                        if(messages[i-1] != undefined) pvUsername = messages[i-1].username;
                        return <Message key={`message-${i}`} {...message} pvUsername={pvUsername}/>
                    })}
                </ul>
            </div>
        );
    }
}

function getMessage(text) {
    var message = "";
    if(text != undefined) {
        message = text;
    } else {
        var lipsum = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Aenean ut elit est. Etiam convallis molestie neque eu ornare. Sed blandit gravida ex sit amet commodo. Sed vel purus non massa ornare lacinia at vitae dolor. Donec vitae ex ac nulla sollicitudin suscipit. Praesent molestie viverra odio in feugiat elit. Pellentesque id erat lorem. Praesent ut ipsum elementum ornare risus in elementum neque. Nulla enim ligula tempus eget ex vestibulum malesuada sagittis orci. Suspendisse mattis est in vestibulum elementum est sapien lobortis tellus id efficitur elit felis at diam. Integer sed nisl vel risus placerat aliquet in quis dui. Aenean dapibus metus nec tempor eleifend. Integer ornare accumsan scelerisque. Curabitur justo dui ullamcorper eget euismod eu luctus et leo. Sed urna augue iaculis at condimentum vitae gravida eu libero. Pellentesque condimentum fermentum ligula.".split(" ");
        lipsum = _.shuffle(lipsum);

        var countWords = Math.floor((Math.random() * 30) + 2);
        for(var i = 0; i < countWords; i++) {
            if(i == 0) {
                message += lipsum[i];
                message = message.charAt(0).toUpperCase()+message.slice(1)+" ";
            } else {
                message += lipsum[i].toLowerCase()+" ";
            }
        }
    }

    var left = Math.round(Math.random()) == 1 ? true : false;

    return {
        position: left ? "left" : "right",
        username: left ? "Kasia" : "Tomek",
        avatar: left ? "http://awomanshealth.com/files/2011/04/285-SpSurvivor.jpg" : "https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
        message: message,
        date: Date.now()
    }
}

export default connect((state, ownProps) => {
    return {
        users: state.users
    }
})(Conversation);