/*!
 * Redr - Lazy require for files.
 * 
 * (c) 2011 Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License
 */

var Redr = require('../');
var support = __dirname + '/support/';

describe('Redr', function() {
  it('should expose version', function() {
    Redr.version.should.be.ok;
  });
  
  describe('constructor', function() {
    it('should add validators', function() {
      var redr = new Redr;
      var isNotDir = redr.validators[0];
      var isNotTmp = redr.validators[1];
      isNotDir(support).should.not.be.ok;
      isNotTmp(support + 'file.tmp.js').should.not.be.ok;
    });
    
    it('should register paths', function() {
      var redr = new Redr(support);
      redr.paths.should.eql([support]);
    });
  });
  
  describe('validator', function() {
    it('should be able to register new validator', function() {
      var redr = new Redr;
      redr.validator(function() { return 'foo'; });
      redr.validators[2]().should.eql('foo');
    });
  });
  
  describe('path', function() {
    it('should add path if string', function() {
      var redr = new Redr;
      redr.path(support);
      redr.paths[0].should.eql(support);
    });
    
    it('should recursive add paths if array', function() {
      var redr = new Redr;
      redr.path([support, 'foo/bar']);
      redr.paths[0].should.eql(support);
      redr.paths[1].should.eql('foo/bar');
    });
  });
  
  describe('getter', function() {
    it('should define getter that requires a file', function() {
      var redr = new Redr;
      redr.getter('file1', support + 'file1.js');
      redr.get.file1.should.be.an.object;
      redr.get.file1.foo().should.eql('bar');
    });
  });
  
  describe('load', function(done) {
    it('should load all files from path and define getters afterwards', function() {
      var redr = new Redr(support).load();
      redr.get.file1.should.be.ok;
      redr.get.file2.should.be.ok;
    });
    
    it('should load all files from multiple dirs', function() {
      var redr = new Redr([support, support + 'more']).load();
      redr.get.file1.should.be.ok;
      redr.get.file2.should.be.ok;
      redr.get.file3.should.be.ok;
    });
  });
});