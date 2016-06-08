import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import users from './users';
import user from './user';
import app from './app';
import messages from './messages';
import { createChannel, channels } from './channels';

export default combineReducers({
    app,
    users,
    user,
    createChannel,
    channels,
    messages,
    form: formReducer
});
