import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { SubscribedChannels } from '../../../imports/models/SubscribedChannel';

export function createChannel(name, members = [], type = 'channel', isPrivate = false) {
    return function (dispatch) {
        dispatch({type: 'CREATE_CHANNEL_REQUEST'});
        
        Meteor.call('createChannel', name, members, type, isPrivate, (error, result) => {
            if(!error) {
                dispatch({
                    type: 'CHANNEL_CREATED',
                    id: result.id,
                    channelName: result.channelName
                });
            } else {
                dispatch({
                    type: 'CHANNEL_CREATING_FAILED',
                    reason: error.reason
                });
            }
        });
    }
}

export function fetchChannels() {
    return function (dispatch) {
        Meteor.subscribe('userChannels', () => {
            Tracker.autorun(() => {
                dispatch({
                    type: 'FETCH_CHANNELS',
                    channels: SubscribedChannels.find({})
                });
            });
        });
    }
}