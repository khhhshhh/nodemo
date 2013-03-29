(function(){
	var http = require('http');
	var url = require('url');
	var fs = require('fs');
	var querystring = require('querystring');

	var handle = []; 

	handle['/foo'] = function(req, res){
		res.writeHeader(200, {'Content-Type':'text/html'});
		fs.readFile('foo.html', 'utf8', function(err, data){
			if(err) console.log(err.message);
			else {
				res.writeHeader(200, {'Content-Type':'text/html'});
				res.end(data);
			}
		});
	};

	handle['/get'] = handle['/post'] = function(req, res){
		var query; 
		if(req.method == 'POST') {
			req.setEncoding('utf8');
			req.on('data', function(data) {
				query = querystring.parse(data);
				console.log('data is ' + req.method);
				console.dir(query);
			});
		} else {
			query = querystring.parse(url.parse(req.url).query);
			console.log('data is ' + req.method);
			console.dir(query);
		}
		res.end();
	};

	var server = http.createServer(function(req, res){
		var pathname = url.parse(req.url).pathname;
		console.log(typeof handle[pathname]);
		if(typeof handle[pathname] == 'function') { 
			handle[pathname](req, res);
		} else {
			fs.readFile(
				'404.html', 
				'utf8', 
				function(err, data){
					if(err) console.log('file error');
					else {
						res.writeHeader(200, {'Content-Type':'text/html'});
						res.end(data);
					}
				}
			);
		}
	}).listen(8888);
})();
