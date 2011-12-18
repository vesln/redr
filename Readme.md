# Redr

Lazy require for files.

## Why?

- Easy to mock.
- Require only what you *really* have to.
- Because I use it like everywhere and I'm too lazy to copy-paste code.

## Usage

	var Redr = require('redr');
	var files = new Redr('/path/to/controllers/').load();
	var jobsController = files.get.jobs; // this will perform require

## Real life examples (srsly?)

Express:
	
	var express = require('express');
	var app = express.createServer();
	var Redr = require('redr');
	var controllers = new Redr('/path/to/controllers/').load();
	
	app.get('jobs', function() {
		return controllers.get.jobs.index;
	});

## Features

- Multiple paths
- Validators

## Tests
	
	$ npm install
	$ make test

## Inspiration



## License

MIT License.