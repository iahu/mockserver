module.exports = function (filePath, jsonp, jsonpcallback) {
	var mock = require('mockjs');
	var path = require('path');
	var configPath = path.join( process.cwd(), filePath );
	// force no cache
	delete require.cache[ require.resolve(configPath) ];
	var config = require( configPath );
	var mockData = mock.mock( config );

	return function (req, res, next) {
		var querystring = require('querystring');
		var pathname = req._parsedUrl.pathname;
		var query = querystring.parse(req._parsedUrl.query);
		var data, callbackName;

		if ( mockData.hasOwnProperty(pathname) ) {
			data = JSON.stringify(mockData[pathname]);
			if ( jsonp && query.hasOwnProperty(jsonpcallback) ) {
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