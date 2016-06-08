import Immutable from 'immutable';

const initialState = Immutable.Map({
    list: []
});

export default function messages(state = initialState, action) {

    switch(action.type) {
        case 'FETCH_MESSAGE_HISTORY':
            const messages = [];
            action.messages.map((message) => {
                messages.push(message);
            });

            return state.set('list', messages);
            break;

        case 'MESSAGE_SENT':
            return state.update('list', list => list.concat(action.message));
            break;
    }

    return state;
}