import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

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