import { MessageHistory } from '../../imports/models/MessageHistory';

Meteor.publish('messageHistory', function(channelId) {
    if(!this.userId) return this.ready();

    //TODO: check permissions to see messages

    return MessageHistory.find({channelId}, {
        fields: {
            channelId: 1,
            user: 1,
            type: 1,
            message: 1,
            publishedAt: 1
        }
    });
});