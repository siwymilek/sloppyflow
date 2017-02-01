import { MessageHistory } from '../../../imports/models/MessageHistory';
import { Tracker } from 'meteor/tracker';

export function getMessageHistory(channelId) {
    return function (dispatch) {
        Meteor.subscribe('messageHistory', channelId, () => {
            Tracker.autorun(() => {
                const messages = MessageHistory.find({channelId});

                dispatch({
                    type: 'FETCH_MESSAGE_HISTORY',
                    messages
                });
            });
        });
    }
}

export function sendMessage(message) {
    return function(dispatch, getState) {
        const channelId = getState().app.get('currentChannel');

        if(channelId) {
            Meteor.call('sendMessage', channelId, message, 'message', (error, result) => {
                if(!error) {
                    dispatch({
                        type: 'MESSAGE_SENT',
                        id: result.id,
                        message: result.message
                    });
                } else {
                    dispatch({
                        type: 'MESSAGE_SENDING_FAILED',
                        reason: error.reason
                    });
                }
            });
        } else {
            throw new Meteor.Error('unknown-error', 'Unknown error', {
                action: 'conversation.sendMessage'
            });
        }
    }
}