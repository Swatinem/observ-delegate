var Observ = require('observ');

module.exports = Delegate;

function Delegate(value) {
    var obs = Observ(null);
    var rm = null;

    var _set = obs.set;
    obs.set = set;
    obs.get = get;

    obs.set(value);

    return obs;

    function set(val) {
        value = val;
        if (rm) {
            rm();
            rm = null;
        }
        if (typeof val === 'function') {
            rm = val(_set);
        }
        _set(getValue());
    }

    function get() {
        return value;
    }

    function getValue() {
        return typeof value === 'function' ? value() : value;
    }
}
