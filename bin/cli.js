#!/usr/bin/env node
var cli = require('cli');
cli.parse({
	port: ['p', 'server port', 'number', '8800'],
	jsonp: ['j', 'enabled jsonp', 'boolean', true],
	jsonpcallback: ['k', 'jsonp callback name', 'string', 'callback'],
	baseURI: ['b', 'base path of API URI', 'string', ' ']
});

var app = require('../app.js');

cli.main(function (args, options) {
	if ( ! args.length ) {
		console.log('mock file path is empty');
		return;
	}
	app(args[0], options);
});