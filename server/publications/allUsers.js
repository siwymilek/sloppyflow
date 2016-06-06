import Users from '../../imports/models/User';

Meteor.publish('allUsers', () => {
    return Users.find({}, {
        fields: {
            username: 1,
            avatar: 1
        }
    });
});