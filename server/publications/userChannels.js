import { SubscribedChannels } from '../../imports/models/SubscribedChannel';

Meteor.publish('userChannels', function() {
    if(!this.userId) return this.ready();

    return SubscribedChannels.find({
        userId: this.userId
    }, {
        fields: {
            name: 1,
            hidden: 1,
            channelId: 1,
            isPrivate: 1
        }
    });
});