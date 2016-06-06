import { Channels } from '../../imports/models/Channel';
import { SubscribedChannels } from '../../imports/models/SubscribedChannel';

Meteor.publish('getChannel', function(channelName) {
    if(!this.userId) return this.ready();

    const channel = SubscribedChannels.findOne({
        name: channelName,
        userId: this.userId
    }, {fields: {channelId: 1}});

    if(!channel) return this.ready();

    return Channels.find(channel.channelId, {
        fields: {
            channelName: 1,
            usernames: 1,
            type: 1,
            isPrivate: 1
        }
    });
});