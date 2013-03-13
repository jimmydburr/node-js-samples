var http = require('http');

var options = {method: 'HEAD', host: 'concoctedlogic.com', port: 80, path: '/'};
http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
});
