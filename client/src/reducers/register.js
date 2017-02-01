import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    error: null,
    reason: null,
    success: false
});

export default function register(state = initialState, action) {

    switch(action.type) {
        case 'REGISTER_ERROR':
            return state.merge({
                error: action.error,
                reason: action.reason,
                success: false
            });
            break;

        case 'REGISTER_SUCCESS':
            return state.merge({
                error: null,
                reason: null,
                success: true
            });
            break;
    }

    return state;
}
