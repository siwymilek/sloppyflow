import Users from '../../../imports/models/User';

export function fetchUsers() {
    return function(dispatch) {
        Meteor.subscribe('allUsers', () => {
            Tracker.autorun(() => {
                dispatch({
                    type: 'FETCH_USERS',
                    data: Users.find({})
                });
            });
        });
    }
}