var connect = require('connect');
var app = connect();
var mockServer = require('./lib/mockServer');

module.exports = function (file, options) {
	app.use(mockServer(file, options.jsonp, options.jsonpcallback));

	var server = app.listen(options.port);
	console.log( '[info] mock server listen at '+ options.port );
	return server;
};