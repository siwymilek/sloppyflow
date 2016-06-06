import { Meteor } from 'meteor/meteor';
import {Channels} from '../../imports/models/Channel';
import {SubscribedChannels} from '../../imports/models/SubscribedChannel';
import Callbacks from '../../imports/lib/callbacks';

Meteor.methods({
    createChannel: (name, members = [], type = 'channel', isPrivate = false) => {
        if(!Meteor.userId()){
            throw new Meteor.Error('error-invalid-user', 'Invalid user', {
                method: 'createChannel'
            });
        }

        const namePattern = new RegExp('^[0-9a-zA-Z-_.]+$');

        if(!namePattern.test(name)) {
            throw new Meteor.Error('error-invalid-name', 'Invalid name', {
                method: 'createChannel'
            });
        }

        //Todo: check permissions to create channel

        const now = new Date();
        const user = Meteor.user();

        const isOwner = members.find((u) => u.username == user.username);
        if(!isOwner) members.push(user);

        if(Channels.find({channelName: name}).count()) {
            throw new Meteor.Error('error-duplicate-channel-name', 'A channel with name '+name+' exists', {
                method: 'createChannel'
            });
        }

        const channel = {
            channelName: name,
            usernames: members,
            type,
            isPrivate,
            ts: now
        };

        Callbacks.run('beforeCreateChannel', user, channel);
        const createdChannel = Channels.insert(channel);

        for(let u of members) {
            SubscribedChannels.insert({
                name: channel.channelName,
                userId: u._id,
                channelId: createdChannel,
                hidden: false,
                isPrivate: channel.isPrivate,
                ts: new Date()
            });
        }

        return {
            id: createdChannel,
            channelName: channel.channelName
        }
    },
    
    checkChannelName: function(name) {
        return !!Channels.find({channelName: name}).count();
    }
    
})