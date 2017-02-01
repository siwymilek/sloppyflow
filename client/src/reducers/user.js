import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    data: null,
    error: null,
    reason: null,

});

export default function user(state = initialState, action) {

    switch(action.type) {
        case 'SET_USER':
            return state.merge({
                data: action.user,
                error: null,
                reason: null
            });
            break;

        case 'LOGIN_ERROR':
            return state.merge({
                data: null,
                error: action.error,
                reason: action.reason
            });
            break;

        case 'LOGGED_OUT':
            return initialState;
            break;
    }

    return state;
}