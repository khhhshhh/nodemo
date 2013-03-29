function start(httpServer){
	var io = require('socket.io').listen(httpServer), 
		connections = [],
		count = 0;

	io.set('log level', 1);
	io.sockets.on('connection', function(socket){
		count++;

		var msg = JSON.stringify({
			type : 'msg',
			name : '服务器',
			content : 'Hi!服务端，我是你的服务器啊亲～！！！！！！！！！！！！！'
		});

		var onCount = JSON.stringify({
			type : 'count',
			count : count
		});

		socket.send(msg);
		socket.send(onCount);

		socket.broadcast.emit('message', onCount);

		socket.on('message', function(msg){
			socket.broadcast.emit('message', msg);
		});

		socket.on('disconnect', function(){
			count--;
			var onCount = JSON.stringify({
				type : 'count',
				count : count
			});
			socket.broadcast.emit('message', onCount);
		});
	});
} 
exports.wsStart = start;
