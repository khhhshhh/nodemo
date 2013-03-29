var fs = require('fs'),
	http = require('http');
var server = http.createServer(function(req, res){
	fs.readFile('index.html','utf8', function(err, data){
		res.writeHeader(200, {'Content-Type':'text/html'});
		res.end(data);
	});
}).listen(8080);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	console.log(socket.id);
})
