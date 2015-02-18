var expect = require('chai').expect;

var delegate = require('../');
var value = require('observ');
var struct = require('observ-struct');

describe('ObservDelegate', function () {
    it('should support changing the inner observable', function () {
        var v = delegate(3);
        expect(v()).to.eql(3);

        var listenerVal;
        var rm = v(listener);

        v.set(4);
        expect(listenerVal).to.eql(4);
        expect(v()).to.eql(4);

        var a = struct({
            a: value(3)
        });
        v.set(a);
        expect(listenerVal).to.eql({a: 3});
        expect(v()).to.eql({a: 3});

        a.a.set(4);
        expect(listenerVal).to.eql({a: 4});
        expect(v()).to.eql({a: 4});

        v.get().a.set(5);
        expect(listenerVal).to.eql({a: 5});
        expect(v()).to.eql({a: 5});

        v.set(struct({
            b: 6
        }));
        expect(listenerVal).to.eql({b: 6});
        expect(v()).to.eql({b: 6});

        a.a.set(3);
        expect(listenerVal).to.eql({b: 6});
        expect(v()).to.eql({b: 6});

        function listener(val) {
            listenerVal = val;
        }
    });
});
