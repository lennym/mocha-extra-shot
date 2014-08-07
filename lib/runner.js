var Mocha = require('mocha');
var debug = require('debug');

var Runner = Mocha.Runner;

Runner.prototype.fail = function(test, err){
  ++this.failures;
  test.state = 'failed';

  if ('string' == typeof err) {
    err = new Error('the string "' + err + '" was thrown, throw an Error :)');
  }
  if (this.suite._retries === 0) {
    this.emit('fail', test, err);
  } else {
    this.emit('retry', test, err);
  }
};

Runner.prototype.runSuite = function(suite, fn){
  var total = this.grepTotal(suite)
    , self = this
    , i = 0
    , failures;

  debug('mocha:runner')('run suite %s', suite.fullTitle());

  if (!total) return fn();

  this.emit('suite', this.suite = suite);

  function next(errSuite) {
    if (errSuite) {
      // current suite failed on a hook from errSuite
      if (errSuite == suite) {
        // if errSuite is current suite
        // continue to the next sibling suite
        return done();
      } else {
        // errSuite is among the parents of current suite
        // stop execution of errSuite and all sub-suites
        return done(errSuite);
      }
    }

    if (self._abort) return done();

    var curr = suite.suites[i++];
    if (!curr) return done();
    self.runSuite(curr, next);
  }

  function done(errSuite) {
    self.suite = suite;
    self.hook('afterAll', function(){
      self.emit('suite end', suite);
      if (self.failures > failures && suite._retries > 0) {
        suite._retries--;
        self.total = 0;
        self.failures = failures;
        self.runSuite(suite, fn);
      } else {
        fn(errSuite);
      }
    });
  }

  this.hook('beforeAll', function(err){
    if (err) return done();
    failures = self.failures;
    self.runTests(suite, next);
  });
};

module.exports = Runner;