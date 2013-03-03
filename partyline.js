var app = require('http').createServer(handler),
	fs = require('fs'),
	io = require('socket.io').listen(app);
app.listen(8080);

function handler (req, res) {
	// upon first connect send the client code
	fs.readFile(__dirname + '/client.html', function (err, data){
		if (err) {
			console.log (err);
			res.writeHead(500);
			return res.end('Error loading client.html');
		}
	res.writeHead(200);
	res.end(data);
	});
}
// create a websocket
io.sockets.on('connection', function(socket) {
	socket.emit('chat', {Chatting: 'on the partyline'});
	socket.on('set nickname', function(nickname){
		socket.set('nickname', nickname, function (){
			var connected_msg = nickname + ' is now connected.';
			console.log(connected_msg);
			io.sockets.volatile.emit('broadcast_msg', connected_msg);
		});
	});
	socket.on('emit_msg', function(msg) {
		// Get the variable nickname
		socket.get('nickname', function(err, nickname) {
			console.log('Chat msg by ', nickname);
			io.sockets.volatile.emit('broadcast_msg', nickname + ': ' + msg);
		});
	});
});


