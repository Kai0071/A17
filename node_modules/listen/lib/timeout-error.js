/*
 * listen.js
 *
 * Copyright (c) 2012-2013 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

function TimeoutError() {
  this.name = 'TimeoutError';
}

TimeoutError.prototype = Error.prototype;

module.exports = TimeoutError;
