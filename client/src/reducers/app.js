import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    currentChannel: null,
});

export default function app(state = initialState, action) {

    switch(action.type) {
        case 'SET_CURRENT_CHANNEL':
            return state.merge({
                currentChannel: action.channelName,
            });
            break;
    }

    return state;
}