module.exports = function (options) {
	return function (req, res, next) {
		var path = require('path');
		var querystring = require('querystring');
		var mock = require('mockjs');
		var filePath = options.file;
		var configPath = path.join( process.cwd(), filePath );
		// force no cache
		if ( ! options.cache ) {
			delete require.cache[ require.resolve(configPath) ];
		}
		var query = querystring.parse(req._parsedUrl.query);
		// extend querystring date to mock.Random
		mock.Random.extend({
			_query: function (key) {
				if (key) {
					return query[key];
				}
				return '';
			}
		});

		var config = require( configPath );
		var mockData = mock.mock( config );
		var baseURI = options.baseURI.trim();
		var pathname = path.posix.join('/', baseURI, req._parsedUrl.pathname);
		var jsonpcallback = options.jsonpcallback;
		var data, callbackName;

		if ( mockData.hasOwnProperty(pathname) ) {
			data = JSON.stringify(mockData[pathname]);
			if ( !options['no-jsonp'] && jsonpcallback in query ) {
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