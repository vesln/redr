/*!
 * Redr - Lazy require for files.
 * 
 * (c) 2011 Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License
 */
 
/**
 * Module dependencies.
 */
var fs = require('fs');
var package = require('package')(module);
var normalize = require('path').normalize;

/**
 * Reader constructor.
 * 
 * @param {Array|String} path
 */
function Redr(path) {
  this.paths = [];
  this.validators = [];
  this.get = {};
  
  this.validator(function(file) {
    return !fs.statSync(file).isDirectory();
  });
  
  this.validator(function(file) {
    return !file.match(/.tmp.js$/);
  });
  
  this.path(path);
}

/**
 * Registers a new path.
 * 
 * @param {Array|String} path
 */
Redr.prototype.path = function(path) {
  var self = this;
  if (!path) return;
  if (Array.isArray(path)) {
    path.forEach(function(p) {
      self.path(p);
    });
  } else {
    this.paths.push(path);
  }
};

/**
 * Search + filter files and delegates lazy requires.
 * 
 * @param {String} path
 * @returns {Object} this
 */
Redr.prototype.load = function() {
  var self = this;
  this.paths.forEach(function(path) {
    path = normalize(path + '/');
    fs.readdirSync(path).forEach(function(file) {
      if (self.validate(path + file)) {
        self.getter(file.replace(/.js$/, ''), path + file);
      }
    });
  });
  return this;
};

/**
 * Defines getters.
 * 
 * @param {String} name
 * @param {String} file
 */
Redr.prototype.getter = function(name, file) {
  this.get.__defineGetter__(name, function() {
    return require(file);
  });
};

/**
 * Adds new validator.
 * 
 * @param {Function} v
 */
Redr.prototype.validator = function(v) {
  this.validators.push(v);
};

/**
 * Performs validation logic.
 * 
 * @param {String} file
 */
Redr.prototype.validate = function(file) {
  var valid = true;
  this.validators.forEach(function(v) {
    if (!v(file)) valid = false;
  });
  return valid;
};

/**
 * Exporting the lib.
 */
module.exports = Redr;

/**
 * Exporting lib version.
 */
module.exports.version = package.version;