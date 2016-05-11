module.exports = function (options) {
	return function (req, res, next) {
		var mock = require('mockjs');
		var path = require('path');
		var filePath = options.file;
		var configPath = path.join( process.cwd(), filePath );
		// force no cache
		if ( ! options.cache ) {
			delete require.cache[ require.resolve(configPath) ];
		}
		var config = require( configPath );
		var mockData = mock.mock( config );
		var querystring = require('querystring');
		var baseURI = options.baseURI.trim();
		var pathname = path.posix.join('/', baseURI, req._parsedUrl.pathname);
		var query = querystring.parse(req._parsedUrl.query);
		var jsonpcallback = options.jsonpcallback;
		var data, callbackName;

		if ( mockData.hasOwnProperty(pathname) ) {
			data = JSON.stringify(mockData[pathname]);
			if ( options.jsonp && query.hasOwnProperty(jsonpcallback) ) {
				callbackName = query[jsonpcallback];
				data = callbackName + '(' + data + ')';
			}
			res.writeHead(200, {
				'Content-Type': 'application/javascript',
				'Content-Length': new Buffer(data).length
			});
			res.end(data);
		} else {
			next();
		}
	};
};