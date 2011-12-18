/*!
 * Redr - Lazy require for files.
 * 
 * (c) 2011 Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License
 */
 
var Redr = require('../');
var files = new Redr([__dirname + '/support', __dirname + '/support/more']).load();

var file1 = files.get.file1; // ./support/file1.js
var file2 = files.get.file2; // ./support/file2.js
var file3 = files.get.file3; // ./support/more/file3.js