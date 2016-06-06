import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    list: []
});

export default function user(state = initialState, action) {

    switch(action.type) {
        case 'FETCH_USERS':
            return state.set('list', action.data);
            break;
    }

    return state;
}