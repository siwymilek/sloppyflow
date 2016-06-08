import { Class } from 'meteor/jagi:astronomy';

export const MessageHistory = new Mongo.Collection('sloppyflow_message_history');
// export const MessageHistory = Class.create({
//     name: 'MessageHistory',
//     collection: Channels,
//     fields: {
//         channelId: String,
//         user: Object,
//         'user.$.id': String,
//         'user.$.username': String,
//         message: String,
//         publishedAt: Date
//     }
// });

// { channelId: 'dGE3hkmM5Pw49Yzv6', user: { userId: 'J2A3EJcYi6qCkzGaP', username: 'peter' }, type: 'message', message: 'Witam na kanale', publishedAt: Date.now() }