import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { getMessageHistory } from './conversation';

import { Channels } from '../../../imports/models/Channel';
import Callbacks from '../../../imports/lib/callbacks';

import { setUser } from './login';

export function appInitialized() {
    return function (dispatch) {
        Tracker.autorun(() => {
            dispatch(setUser(Meteor.user()));
        });
    }
}

export function redirect(path = '/') {
    browserHistory.push(path);
}

export function setCurrentChannel(channelName) {
    return function(dispatch, getState) {
        if(channelName !== getState().app.get('currentChannel')) {
            if(channelName) {
                Meteor.subscribe('getChannel', channelName, () => {
                    const channel = Channels.findOne({channelName});

                    Callbacks.run('openChannel')
                    
                    dispatch({
                        type: 'SET_CURRENT_CHANNEL',
                        channelName: channel._id
                    });

                    dispatch(getMessageHistory(channel._id));
                });
            } else {
                dispatch({
                    type: 'SET_CURRENT_CHANNEL',
                    channelName: null
                });
            }
        }
    }
}