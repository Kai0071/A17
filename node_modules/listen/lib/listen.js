/*
 * listen.js
 *
 * Copyright (c) 2012-2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var ErrorList = require('./error-list');
var TimeoutError = require('./timeout-error');


function withTimeout(delegate, timeout) {
  var timer = setTimeout(function () {
    delegate(new TimeoutError());
    delegate = null;
  }, timeout);
  return function (err, value) {
    if (delegate) {
      clearTimeout(timer);
      delegate(err, value);
    }
  };
}


function listen(initialValues) {
  var values;
  if (arguments.length) {
    if (Object.prototype.toString.call(initialValues) !== '[object Array]') {
      throw new TypeError('Array expected');
    }
    values = Array.prototype.slice.call(initialValues);
  } else {
    values = [];
  }

  var offset = values.length;
  var count = 0;
  var called = 0;
  var errList;
  var handler;

  function resolve(fn) {
    if (errList) {
      fn(errList.length === 1 ? errList[0] : new ErrorList(errList));
    } else {
      while (offset < values.length - 1) {
        if (values[offset] !== undefined) {
          offset++;
        } else {
          values.splice(offset, 1);
        }
      }
      fn(null, values);
    }
  }

  function assertUnresolved() {
    if (handler) {
      throw new Error('Cannot be called after then');
    }
  }

  function pushError(e) {
    if (!errList) {
      errList = [];
    }
    if (e.name === 'ErrorList') {
      Array.prototype.push.apply(errList, e.errors);
    } else {
      errList.push(e);
    }
  }

  function listener(name, fn, timeout) {
    assertUnresolved();
    if (typeof name === 'function') {
      timeout = fn;
      fn = name;
      name = null;
    } else if (typeof name === 'number') {
      timeout = name;
      fn = null;
      name = null;
    } else if (typeof fn === 'number') {
      timeout = fn;
      fn = null;
    }
    var index = offset + count++;
    var callback = function (err, value) {
      if (fn) {
        try {
          fn(err, value);
        } catch (e) {
          if (e !== err) {
            pushError(e);
          }
        }
      }
      if (err) {
        pushError(err);
      }
      if (value !== undefined) {
        values[index] = value;
        if (name) {
          values[name] = value;
        }
      }
      if (++called === count && handler) {
        resolve(handler);
      }
    };
    return timeout ? withTimeout(callback, timeout) : callback;
  }

  listener.push = function push(value) {
    assertUnresolved();
    values[offset + count] = value;
    offset++;
  };

  listener.err = function err(e) {
    assertUnresolved();
    pushError(e);
  };

  listener.then = function then(fn) {
    if (handler) {
      throw new Error('Cannot be called more than once');
    }
    if (typeof fn !== 'function') {
      throw new TypeError('Function expected');
    }
    handler = fn;
    if (called === count) {
      resolve(fn);
    }
  };

  return listener;
}

listen.ErrorList = ErrorList;

module.exports = listen;
