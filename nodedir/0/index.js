// EventEmitter from events
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.once('fire', function(stuff){
	console.log('You fired the stuff is: ' + stuff);
});

eventEmitter.on('fire', function(stuff){
	console.log('fuck: ' + stuff);
});

// fs
var fs = require('fs');

fs.appendFile('fsfoo.txt', 'Hello node', function(err){ // appendFile
	if(err) {
		//console.log(err);
	}
});

fs.exists('fsfoo.txt', function(exits){
	if(exits) {
		//console.log('Yes it exits');
	}
	else {
		//console.log('NO, it doesnt\n');
	}
})

fs.readFile('fsfoo.txt','utf-8', function(err, data){
	if(err) {
	   	//console.log(err);
	}
	else {
		//console.log(data);
	}
})

fs.writeFile('fsfoo.txt', 'jfkldjfldsjafl ','utf-8', function(){
	//console.log('writeFile is ok!');
});

fs.readFileSync('fsfoo.txt','utf-8', function(err, data){
	if(err) {
	   //console.log(err);
	}
	else {
		//console.log(data);
	}
})

// http
var http = require('http');

/*http.get('http://www.google.com.hk', function(res) {
		console.log('http.get(): request statusCode ' + res.statusCode);
		console.log('Header: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function(data) {
			//console.log('data->' + data);
		});
}).on('error', function(e){
	console.log('http.get():error' + e.message);
});

var server = http.createServer(function(req, res) {
	var body = '<html>' + 
					'<body>'+
						'<h1>Hello you!~</h1>'+  
					'</body>'+
			   '</html>'; 
	res.writeHeader(200, {'Content-Type':'text/html'});
	res.write(body);
	res.end();
});
server.listen(8888);*/

// path
var log = function(message) {
	console.log(message);
};
var path = require('path');
(function(){
	var pathname = 'foo/ab/khit/dir/index.html';
	log(path.basename(pathname));// index.html
	log(path.dirname(pathname)); // foo/ab/khit/dir
	log(path.extname('index.html')); // .html
	log(path.join('file/', 'foo', '/kk','index.html'));
	log(path.normalize('/ff/dir/ppp/../../'));
	log(fs.exists('index.js'));
})();

// querystring
var query = require('querystring');
(function(){
	var web = 'www.baidu.com/?fuck=you&name=mother&psw=hello';

	var a = query.parse(web);
	log(a);

	var b = {
		name : 'fuck',
		pwd : 123456
	}; 
	log(query.stringify(b));
})();
