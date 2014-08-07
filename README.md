Mocha Extra Shot
================

Allows test suites in Mocha to retry on failure.

Inspired by the ideas in https://www.npmjs.org/package/mocha-retry by @giggio, but to support programmatically constructed test suites.

You should read the README for that module, in particular the reasons you shouldn't use that (or this) module.

> Tests that pass sometimes, and sometimes they don't are a bad smell. Your tests should be consistent: either they always pass, or they always fail. So, don't use this Mocha plugin, instead make your tests consistent.

Usage
-----

Extra Shot can be used as a drop-in replacement for Mocha when building test suites programmatically.

```javascript

var Mocha = require('mocha-extra-shot');
var runner = new Mocha(options);
var suite = Mocha.Suite.create(runner.suite, 'a retry-able suite');

suite.retries(1);

// add some tests to your suite
suite.addTest(...);
suite.addTest(...);
suite.addTest(...);

runner.run();
```

Reporters
---------

Extra Shot comes with a base reporter supporting output for retried suites, and extensions of the spec (`spec-retry`) and dot (`dot-retry`) reporters based on this.

### Usage:

```javascript
var Mocha = require('mocha-extra-shot');
var runner = new Mocha({
  reporter: 'spec-retry',
  ...
});
```

```javascript
var Mocha = require('mocha-extra-shot');
var runner = new Mocha({
  reporter: Mocha.reporters.DotRetry,
  ...
});
```