# Redr

Lazy require for files.

## Why?

- Easy to mock.
- Require only what you *really* have to.
- Because I use it like everywhere and I'm too lazy to copy-paste code.

## Install
	
	$ npm install redr

## Usage

	var Redr = require('redr');
	var files = new Redr('/path/to/controllers/').load();
	var jobsController = files.get.jobs; // this will perform require

## Features

- Multiple paths
- Validators

## Tests
	
	$ npm install
	$ make test

## License

MIT License.