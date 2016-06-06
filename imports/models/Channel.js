import { Class } from 'meteor/jagi:astronomy';

export const Channels = new Mongo.Collection('sloppyflow_channels');
export const Channel = Class.create({
    name: 'Channel',
    collection: Channels,
    fields: {
        name: String,
        userId: String,
        publishedAt: Date
    }
});