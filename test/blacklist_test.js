var assert = require('assert');
var _ = require('lodash');
var blacklist = require('../blacklist.js')

describe('#blacklist()', function() {

  context('replace masked jsonpath with undefined', function() {
    let options;
    beforeEach(function() {
      options = {
        replacement: undefined
      };
    });

    it('should turn masked jsonpath key to undefined', function(done) {
      var inputJSON = { a: 'keep', b: { c: 'remove'}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: { c: undefined }}));
      done();
    });

    it('should turn masked jsonpath object to undefined', function(done) {
      var inputJSON = { a: 'keep', b: { c: { remove: 'be removed'}}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: { c: undefined }}));
      done();
    });

    it('should turn masked jsonpath array to undefined', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['remove', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: { c: undefined }}));
      done();
    });

    it('should turn masked jsonpath array item to undefined', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c[1]', 'b.c[2]'], inputJSON, options), { a: 'keep', b: { c: ['keep', undefined, undefined] }}));
      done();
    });
  });

  
  context('replace masked jsonpath with specified pattern', function() {
    let options;
    beforeEach(function() {
      options = {
        replacement: '<_masked_>'
      };
    });

    it('should replace masked jsonpath key with specified pattern', function(done) {
      var inputJSON = { a: 'keep', b: { c: 'remove'}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: { c: '<_masked_>' }}));
      done();
    });

    it('should replace masked jsonpath object with specified pattern', function(done) {
      var inputJSON = { a: 'keep', b: { c: { remove: 'be removed'}}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: { c: '<_masked_>' }}));
      done();
    });

    it('should replace masked jsonpath array with specified pattern', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['remove', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: { c: '<_masked_>' }}));
      done();
    });

    it('should replace masked jsonpath array item with specified pattern', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c[1]', 'b.c[2]'], inputJSON, options), { a: 'keep', b: { c: ['keep', '<_masked_>', '<_masked_>'] }}));
      done();
    });  
  });
  

  context('remove masked jsonpath with entirely', function() {
    let options;
    beforeEach(function() {
      options = {};
    });
    it('should remove masked jsonpath object', function(done) {
      var inputJSON = { a: 'keep', b: { c: { remove: 'be removed'}}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: {}}));
      done();
    });

    it('should remove masked jsonpath array', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['remove', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: {}}));
      done();
    });

    it('should remove masked jsonpath array item', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c[1]', 'b.c[2]'], inputJSON, options), { a: 'keep', b: { c: ['keep'] }}));
      done();
    });
  });

  context('do not modify input object', function() {
    let options;
    beforeEach(function() {
      options = {
        deepCopy: true
      };
    });

    it('should remove masked jsonpath key entirely without modifying the input object', function(done) {
      var inputJSON = { a: 'keep', b: { c: 'remove'}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: {}}));
      assert(_.isEqual(inputJSON, { a: 'keep', b: { c: 'remove'}}));
      done();
    });

    it('should remove masked jsonpath object entirely without modifying the input object', function(done) {
      var inputJSON = { a: 'keep', b: { c: { remove: 'be removed'}}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: {}}));
      assert(_.isEqual(inputJSON, { a: 'keep', b: { c: { remove: 'be removed'}}}));
      done();
    });

    it('should remove masked jsonpath array entirely without modifying the input object', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['remove', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c'], inputJSON, options), { a: 'keep', b: {}}));
      assert(_.isEqual(inputJSON, { a: 'keep', b: { c: ['remove', 'remove', 'remove']}}));
      done();
    });

    it('should remove masked jsonpath array item entirely without modifying the input object', function(done) {
      var inputJSON = { a: 'keep', b: { c: ['keep', 'remove', 'remove']}};
      assert(_.isEqual(blacklist(['b.c[1]', 'b.c[2]'], inputJSON, options), { a: 'keep', b: { c: ['keep'] }}));
      assert(_.isEqual(inputJSON, { a: 'keep', b: { c: ['keep', 'remove', 'remove']}}));
      done();
    });
  });
  
});


