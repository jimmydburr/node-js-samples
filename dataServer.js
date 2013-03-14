var os=require('os');
var updateInterval = 1000;	// in milliseconds
var memToGB = 1024 * 1024 * 1024;	// convert bytes to gigs
var sleep = require('sleep');
var myData = new Object;
//myData.cpu = os.cpus()[0].times.user;
//myData.memory = os.freemem();
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
	var earliestIdle = os.cpus()[0].times.idle;
	var start = Date.now();
	console.log(earliestIdle);
	sleep.usleep(updateInterval * 100);
	var latestIdle = os.cpus()[0].times.idle;
	console.log(latestIdle);
	var end = Date.now();
	myData.idle = Math.round((latestIdle - earliestIdle) / updateInterval * 100);
	myData.cpu = 100 - myData.idle;
	myData.memory = Math.round(os.freemem() / memToGB);
	// ok kick things off in the browser
	socket.emit('broadcast_msg', myData);

	setInterval(function() {
		earliestIdle = latestIdle;
		latestIdle = os.cpus()[0].times.idle;
		myData.idle = Math.round((latestIdle - earliestIdle) / updateInterval * 100);
		myData.cpu = 100 - myData.idle;
		myData.memory = Math.round(os.freemem() / memToGB);
		io.sockets.volatile.emit('broadcast_msg', myData);
	}, updateInterval);

});

