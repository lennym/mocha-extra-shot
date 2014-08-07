var Mocha = require('mocha');

Mocha.reporters = require('./lib/reporters');
Mocha.Suite = require('./lib/suite');
Mocha.Runner = require('./lib/runner');

var Reporter = Mocha.prototype.reporter;

Mocha.prototype.reporter = function (reporter) {
  var _reporter = reporter;
  if ('string' === typeof reporter) {
    try { _reporter = require('./lib/reporters/' + reporter); } catch (err) {};
    if (!_reporter) try { _reporter = require(reporter); } catch (err) {};
  }
  return Reporter.call(this, _reporter);
};

module.exports = Mocha;