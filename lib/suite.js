var Mocha = require('mocha');
var debug = require('debug');

var _Suite = Mocha.Suite;

var Suite = function (title, parentContext) {
  _Suite.call(this, title, parentContext);
  this._retries = 0;
};

_Suite.prototype.retries = function (n) {
  if (0 === arguments.length) return this._retries;
  debug('mocha:suite')('retries %d', n);
  this._retries = parseInt(n, 10);
  return this;
};

Suite.prototype.__proto__ = _Suite.prototype;
Suite.create = _Suite.create;

module.exports = Suite;