var uuid = require("node-uuid");

var listeners = {};

function dispatch(payload) {
    for (var id in listeners) {
        listeners[id](payload);
    }
}

function register(cb) {
    var id = uuid.v4();
    listeners[id] = cb;
}

module.exports = {
    register: register,
    dispatch: dispatch
}