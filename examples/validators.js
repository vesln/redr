/*!
 * Redr - Lazy require for files.
 * 
 * (c) 2011 Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License
 */
 
var Redr = require('../');
var files = new Redr(__dirname + '/support');

files.validator(function(file) {
  if (file.match(/file2.js$/)) return false;
});

var file1 = files.get.file1; // ./support/file1.js
var file2 = files.get.file2; // This will be undefined