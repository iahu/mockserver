var connect = require('connect');
var app = connect();
var mockServer = require('./lib/mockServer');
var compression = require('compression');
app.use(compression());

module.exports = function (options) {
	app.use(mockServer(options));

	var server = app.listen(options.port);
	console.log( '[info] mock server listen at '+ options.port );
	return server;
};