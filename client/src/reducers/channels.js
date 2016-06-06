import Immutable from 'immutable';

const initialCreateChannelState = Immutable.fromJS({
    isProcessing: false,
    error: false,
    id: null,
    channelName: null,
    reason: null
});

export function createChannel(state = initialCreateChannelState, action) {

    switch(action.type) {
        case 'CREATE_CHANNEL_REQUEST':
            return state.merge({
                isProcessing: true,
                error: false,
                id: null,
                channelName: null,
                reason: null
            });
            break;
        
        case 'CHANNEL_CREATED':
            return state.merge({
                isProcessing: false,
                error: false,
                id: action.id,
                channelName: action.channelName,
                reason: null
            });
            break;
        
        case 'CHANNEL_CREATING_FAILED':
            return state.merge({
                isProcessing: false,
                error: true,
                id: null,
                channelName: null,
                reason: action.reason
            });
            break;
    }

    return state;
}

const initialChannelsState = Immutable.fromJS({
    list: []
});

export function channels(state = initialChannelsState, action) {
    if(action.type == 'FETCH_CHANNELS') {
        return state.merge({
            list: action.channels
        });
    }
    
    return state;
}
