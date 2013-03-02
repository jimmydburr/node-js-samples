var http = require('http'),
	fs = require('fs');

var srv = http.createServer(function(req, res) {
	fs.readFile(__dirname + '/client.html', function (err, data){
		if (err) {
			console.log ('Error: ' + err);
			res.writeHead(500);
			return res.end('Error loading client.html');
		}
	res.writeHead(200);
	res.end(data);
	});
}).listen(8080);

