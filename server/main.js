import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
    return Meteor.setTimeout(function() {
        var msg;
        msg = ["Process Port: => " + process.env.PORT].join('\n');
        console.log(msg);
    }, 100);
});