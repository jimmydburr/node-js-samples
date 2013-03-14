var os=require('os');
var myData = new Object;
myData.cpu = os.cpus()[0].times.user;
myData.memory = os.freemem();
console.log(myData);
//throw '';

var app = require('http').createServer(handler),
	fs = require('fs'),
	io = require('socket.io').listen(app);
app.listen(8080);

function handler (req, res) {
	// upon first connect send the client code
	fs.readFile(__dirname + '/jsgdyn.html', function (err, data){
		if (err) {
			console.log (err);
			res.writeHead(500);
			return res.end('Error loading jsgdyn.html');
		}
	res.writeHead(200);
	res.end(data);
	});
}
// create a websocket
io.sockets.on('connection', function(socket) {
	console.log('Got a connection.');
	myData.cpu = os.cpus()[0].times.user/(1024*1024);
	myData.memory = os.freemem()/(1024*1024*100);
	socket.emit('broadcast_msg', myData);

	setInterval(function() {
		myData.cpu = os.cpus()[0].times.user/(1024*1024);
		myData.memory = os.freemem()/(1024*1024*100);
		io.sockets.volatile.emit('broadcast_msg', myData);
	}, 1000);

});

