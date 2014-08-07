var Mocha = require('mocha');
var ms = require('ms');
var clone = require('clone');

var _Base = Mocha.reporters.Base;

var Base = function (runner) {
  _Base.call(this, runner);
  var self = this;
  this.stats.retries = 0;
  this.retries = [];
  runner.on('retry', function (test, err) {
    self.stats.retries++;
    self.retries.push([test, err]);
  });

};

Base.prototype.epilogue = function () {

  var stats = this.stats;
  var tests;
  var fmt;
  var color = _Base.color;

  console.log();

  // passes
  fmt = color('bright pass', ' ')
    + color('green', ' %d passing')
    + color('light', ' (%s)');

  console.log(fmt,
    stats.passes || 0,
    ms(stats.duration));

  // pending
  if (stats.pending) {
    fmt = color('pending', ' ')
      + color('pending', ' %d pending');

    console.log(fmt, stats.pending);
  }

  // retried
  if (stats.retries) {
    fmt = color('pending', ' ')
      + color('pending', ' %d retried');

    console.log(fmt, stats.retries);

    Base.list(this.retries.map(function (a) {
      var test = clone(a[0], null, 1);
      test.err = a[1];
      return test;
    }));

  }

  // failures
  if (stats.failures || stats.retries) {
    fmt = color(stats.failures ? 'fail' : 'pass', '  %d still failing');

    console.error(fmt,
      stats.failures);

    Base.list(this.failures);
    console.error();
  }

  console.log();

};

Base.prototype.__proto__ = _Base.prototype;

Object.keys(_Base).forEach(function (prop) {
  Base[prop] = _Base[prop];
});

module.exports = Base;