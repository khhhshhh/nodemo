var http = require('http'); 
var url = require('url'); 
var fs = require('fs');
var path = require('path');
var ws = require('./ws');

var MIME = [];
MIME['.js'] = 'javascript';
MIME['.html'] = 'html';
MIME['.css'] = 'css';

var server = http.createServer(function(req, res){
	var info = url.parse(req.url);
	var pathname = '.' + info.pathname;
	fs.exists(pathname, function(ex){
		if(ex) {
			fs.readFile(pathname, 'utf8', function(err, data){
				if(err) {
					console.log('error');
					res.end('404 not found');
				} 
				else {
					var extname = path.extname(pathname);
					var type = MIME[extname] ? MIME[extname] : 'plain';
					res.writeHeader(200, {'Content-Type': 'text/' + type});
					res.write(data);
					res.end();
				}
			});
		} else {
			res.writeHeader(200, {'Content-Type':'text/html'});
			res.end('404 not found');
		}
	});
});

server.listen(8000);

ws.wsStart(server);
