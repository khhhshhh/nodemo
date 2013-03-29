var http = require('http');
var url = require('url');

var start = function() {
	var server = http.createServer(function(req, res) {
		console.log('Server start');
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.write('Hello\n');
		res.end('response end');
	});
	server.listen(8080);
}

exports.start = start;
