import { Meteor } from 'meteor/meteor';
import { MessageHistory } from '../../imports/models/MessageHistory';
import Callbacks from '../../imports/lib/callbacks';

Meteor.methods({
    sendMessage: (channelId, message, type = 'message') => {
        const user = Meteor.user();
        if(!user){
            throw new Meteor.Error('error-invalid-user', 'Invalid user', {
                method: 'sendMessage'
            });
        }

        if(message.trim().length == 0) {
            throw new Meteor.Error('error-invalid-message', 'Invalid message', {
                method: 'sendMessage'
            });
        }

        //Todo: check permissions send message into channel

        const oMessage = {
            channelId,
            user: {
                userId: user._id,
                username: user.username
            },
            type,
            message,
            publishedAt: new Date()
        };

        Callbacks.run('beforeSendMessage', oMessage);
        const createdMessage = MessageHistory.insert(oMessage);

        return {
            id: createdMessage,
            message: {_id: createdMessage, ...oMessage}
        }
    }
});