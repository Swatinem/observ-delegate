# ObservDelegate

The same as [Observ](https://github.com/Raynos/observ), except you can
`.set()` another Observ instance to delegate to.

## Example

```js
var Struct = require("observ-struct")
var Delegate = require("observ-delegate")

var v = Delegate("initial value")

v(function onchange(newValue) {
  assert.equal(newValue.struct, "new value")
})
v.set(Struct({struct: "new value"}))

var curr = v()
assert.equal(curr.struct, "new value")
```

## Docs

The same API as Observ, except we have another `.get()` method that returns the
observable we delegate to.
