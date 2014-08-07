var Mocha = require('mocha');

Mocha.reporters.BaseRetry = require('./base-retry');
Mocha.reporters.SpecRetry = require('./spec-retry');

module.exports = Mocha.reporters;