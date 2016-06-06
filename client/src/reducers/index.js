import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import users from './users';
import user from './user';
import { createChannel, channels } from './channels';

export default combineReducers({
    users,
    user,
    createChannel,
    channels,
    form: formReducer
});
