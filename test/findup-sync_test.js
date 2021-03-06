'use strict';

// Nodejs lib.
var path = require('path');

var findup = require('../lib/findup-sync.js');

// Get a relative path.
var rel = function(abspath) {
  return typeof abspath === 'string' ? path.relative('.', abspath) : abspath;
};

exports['findup'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'simple': function(test) {
    test.expect(8);
    var opts = {cwd: 'test/fixtures/a/b'};
    test.equal(rel(findup('foo.txt', opts)), 'test/fixtures/a/foo.txt', 'should find files');
    test.equal(rel(findup('bar.txt', opts)), 'test/fixtures/a/b/bar.txt', 'should find files');
    test.equal(rel(findup('a.txt', opts)), 'test/fixtures/a.txt', 'should find files');
    test.equal(rel(findup('?.txt', opts)), 'test/fixtures/a.txt', 'should support glob patterns');
    test.equal(rel(findup('*.txt', opts)), 'test/fixtures/a/b/bar.txt', 'should find the first thing that matches the glob pattern');
    test.equal(rel(findup(['b*.txt', 'f*.txt'], opts)), 'test/fixtures/a/b/bar.txt', 'should find the first thing that matches any of the glob patterns');
    test.equal(rel(findup(['f*.txt', 'b*.txt'], opts)), 'test/fixtures/a/b/bar.txt', 'should find the first thing that matches any of the glob patterns');
    test.equal(findup('not-gonna-exist-i-hope.txt', opts), null, 'should returning null if no files found');
    test.done();
  },
};
