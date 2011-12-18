/*!
 * Redr - Lazy require for files.
 * 
 * (c) 2011 Veselin Todorov <hi@vesln.com>
 * Licensed under the MIT License
 */
 
var express = require('express');
var app = express.createServer();
var Redr = require('../');
var controllers = new Redr(__dirname + '/controllers').load();

app.get('/jobs', function(req, res) {
  return controllers.get.jobs.index(req, res);
});

app.listen(3000);