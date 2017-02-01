import { Meteor } from 'meteor/meteor';

export function setUser(user = null) {
    return {
        type: 'SET_USER',
        user
    }
}

export function login(username = '', password = '') {
    return function(dispatch) {
        Meteor.loginWithPassword(username, password, (response) => {
            if(response) {
                dispatch({
                    type: 'LOGIN_ERROR',
                    error: response.error,
                    reason: response.reason
                });
            } else {
                dispatch(setUser(Meteor.user()));
            }
        });
    }
}


export function register(username = '', password = '') {
    return function (dispatch) {
        Accounts.createUser({username, password}, (response) => {
            if(response) {
                dispatch({
                    type: 'REGISTER_ERROR',
                    error: response.error,
                    reason: response.reason
                });
            } else {
                dispatch({
                    type: 'REGISTER_SUCCESS'
                });
            }
        });
    }
}

export function logout() {
    Meteor.logout();

    return {
        type: 'LOGGED_OUT'
    };
}