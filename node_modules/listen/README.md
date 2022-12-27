# listen.js

[![Build Status]](https://travis-ci.org/mantoni/listen.js)
[![SemVer]](http://semver.org)
[![License]](https://github.com/mantoni/listen.js/blob/master/LICENSE)

A tiny library to wait for the results of multiple callbacks. For node and the
browser.

## Install

This will install the `listen` module in your current project and add it to the
`dependencies`:

```
npm install listen --save
```

## Usage

```js
var listen = require('listen');

var listener = listen();

var callbackA = listener();
var callbackB = listener();

/*
 * Do async stuff with callbacks.
 *
 * Callbacks follow the Node.js convention. They expect an error or null as
 * the first argument and an optional value as the second:
 *
 * Fail: callback(new Error('ouch!'));
 * Return: callback(null, 'some return value');
 */
listener.then(function (err, values) {
  /*
   * err    - 1) null if no callback received an error
   *          2) the error of the callback that received an error
   *          3) an error with name ErrorList wrapping multiple errors
   *
   * values - The non-undefined return values from all callbacks in order of
   *          callback creation, also exposing names callbacks (see API)
   */
});
```

# API

Start with `var listen = require('listen')`, then use the `listen` function to
create listeners. Use the listeners to create callbacks.

- `listen([values])`: Creates and returns a new listener function. If `values`
  are given, it must be an array with initial values.
- `listener([name][, func][, timeout])`: Creates a new callback associated with
  the listener. Throws if called after `then`. All arguments are optional and
  can be combined.
    - `name` exposes the return value of the callback on the values object
      under that name.
    - `func` gets invoked with `(err, value)` when the callback is invoked.
    - `timeout` calls the callback with a `TimeoutError` after the timeout.
- `listener.then(func)`: Invokes the given function once all callbacks where
  invoked. If none of the callbacks had errors, the first argument is `null`,
  otherwise it's an `Error`. The second argument is the values array in order
  of callback creation. Can only be called once.
- `listener.push(value)`: Pushes a value to the internal values array. Throws
  if called after `then`.
- `listener.err(error)`: Adds an error to the internal error list. Throws if
  called after `then`.

## Compatibility

The `listen` has 100% coverage and runs in these environments:

- Node 0.10, 0.12, 4.3 & 6.3
- IE 9, 10, 11
- Firefox
- Chore
- PhantomJS

## License

MIT

[Build Status]: http://img.shields.io/travis/mantoni/listen.js.svg
[SemVer]: http://img.shields.io/:semver-%E2%9C%93-brightgreen.svg
[License]: http://img.shields.io/npm/l/listen.svg
