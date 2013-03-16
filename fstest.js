"use strict";
var fs = require('fs');
var myfiles = [];

var files = fs.readdir('/tmp', function(err, files) {
	if (err) {throw err; }
	console.log('> Reading files');
	myfiles = files;
});

var server = require('http').createServer();

server.on("request", function(request, response) {
	console.log("> Request Started");
	request.on("end", function() {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		myfiles.forEach(function(element, index, array) {
			response.write(index + ' ' + element.toString() + "\n");
		});
		response.end("Done!");
		console.log("> Request closed");
	});
});
server.listen(8080);

