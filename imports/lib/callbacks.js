// https://raw.githubusercontent.com/steedos/chat/master/packages/rocketchat-lib/lib/callbacks.coffee

/*
 * Callback hooks provide an easy way to add extra steps to common operations.
 * @namespace callbacks
 */
callbacks = {};

callbacks.showTime = false;


/*
 * Callback priorities
 */

callbacks.priority = {
    HIGH: -1000,
    MEDIUM: 0,
    LOW: 1000
};


/*
 * Add a callback function to a hook
 * @param {String} hook - The name of the hook
 * @param {Function} callback - The callback function
 */

callbacks.add = function(hook, callback, priority, id) {
    var base, cb, err, i, len, ref;
    if (priority == null) {
        priority = callbacks.priority.MEDIUM;
    }
    if (!_.isNumber(priority)) {
        priority = callbacks.priority.MEDIUM;
    }
    callback.priority = priority;
    callback.id = id || Random.id();
    if ((base = callbacks)[hook] == null) {
        base[hook] = [];
    }
    if (callbacks.showTime === true) {
        err = new Error;
        callback.stack = err.stack;
    }
    ref = callbacks[hook];
    for (i = 0, len = ref.length; i < len; i++) {
        cb = ref[i];
        if (cb.id === callback.id) {
            return;
        }
    }
    callbacks[hook].push(callback);
};


/*
 * Remove a callback from a hook
 * @param {string} hook - The name of the hook
 * @param {string} id - The callback's id
 */

callbacks.remove = function(hookName, id) {
    callbacks[hookName] = _.reject(callbacks[hookName], function(callback) {
        return callback.id === id;
    });
};


/*
 * Successively run all of a hook's callbacks on an item
 * @param {String} hook - The name of the hook
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks
 * @param {Object} [constant] - An optional constant that will be passed along to each callback
 * @returns {Object} Returns the item after it's been through all the callbacks for this hook
 */

callbacks.run = function(hook, item, constant) {
    var _callbacks;
    _callbacks = callbacks[hook];
    if (!!(_callbacks != null ? _callbacks.length : void 0)) {
        return _.sortBy(_callbacks, function(callback) {
            return callback.priority || callbacks.priority.MEDIUM;
        }).reduce(function(result, callback) {
            var callbackResult, time;
            if (_callbacks.showTime === true) {
                time = Date.now();
            }
            callbackResult = callback(result, constant);
            if (_callbacks.showTime === true) {
                console.log(hook, Date.now() - time);
                console.log(callback.stack.split('\n')[2]);
            }
            return callbackResult;
        }, item);
    } else {
        return item;
    }
};


/*
 * Successively run all of a hook's callbacks on an item, in async mode (only works on server)
 * @param {String} hook - The name of the hook
 * @param {Object} item - The post, comment, modifier, etc. on which to run the callbacks
 * @param {Object} [constant] - An optional constant that will be passed along to each callback
 */

callbacks.runAsync = function(hook, item, constant) {
    var _callbacks;
    _callbacks = callbacks[hook];
    if (Meteor.isServer && !!(_callbacks != null ? _callbacks.length : void 0)) {
        Meteor.defer(function() {
            _.sortBy(_callbacks, function(callback) {
                return callback.priority || callbacks.priority.MEDIUM;
            }).forEach(function(callback) {
                callback(item, constant);
            });
        });
    } else {
        return item;
    }
};

export default callbacks;