#!/usr/bin/env node
var commandLineArgs = require('command-line-args');
var cli = commandLineArgs([
	{
		name: 'file',
		alias: 'f',
		type: String,
		defaultOption: true
	},
	{
		name: 'port',
		alias: 'p',
		// 'server port', 
		type: Number,
		defaultValue: 8800
	},
	{
		name: 'cache', 
		alias: 'c',
		// 'cache mock template file', 
		type: String,
		defaultValue: false
	},
	{
		name: 'jsonp', 
		alias: 'j',
		// 'enabled jsonp', 
		type: String,
		defaultValue: true
	},
	{
		name: 'jsonpcallback', 
		alias: 'k',
		// 'jsonp callback name', 
		type: String,
		defaultValue: 'callback'
	},
	{
		name: 'baseURI', 
		alias: 'b',
		// 'base path of API URI' 
		type: String,
		defaultValue: ''
	}
]);
var options = cli.parse();

if ( options.file === 'false' ) {
	console.log('[error] argument file is empty');
	return;
}
if ( process.argv.slice(2).length === 0 ) {
	console.log( cli.getUsage() );
	return;
}

var app = require('../app.js');
function stringToBoolean(s) {
	if ( typeof s === 'string') {
		return s === 'true' ? true : false;
	} else {
		return s;
	}
}

options.cache = stringToBoolean(options.cache);
options.jsonp = stringToBoolean(options.jsonp);

app(options);