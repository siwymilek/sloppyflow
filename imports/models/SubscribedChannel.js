import { Class } from 'meteor/jagi:astronomy';

export const SubscribedChannels = new Mongo.Collection('sloppyflow_subscribed_channels');
export const SubscribedChannel = Class.create({
    name: 'Channel',
    collection: SubscribedChannels,
    fields: {
        name: String,
        channelId: String,
        userId: String,
        hidden: Boolean,
        isPrivate: Boolean,
        ts: Date
    }
});