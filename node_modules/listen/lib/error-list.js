/*
 * listen.js
 *
 * Copyright (c) 2012-2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

function ErrorList(errors) {
  this.name = 'ErrorList';
  var sep = '\n  - ';
  this.message = 'Multiple callbacks err\'d:' + sep + errors.join(sep);
  this.errors = errors;
}

ErrorList.prototype = Error.prototype;

module.exports = ErrorList;
