var fs = require('fs');
var dns = require('dns');

var fs = fs.readFile('addresses.txt', function (err, addresses){
	if (err) throw err;
	data = addresses.toString();
	addressArray = data.split('\n');
	addressArray.pop();
	addressArray.forEach(function (a) {
		//console.log(typeof(a),':',a);
		dns.reverse(a, function (err, domains) {
		  //if (err) throw err;
		  console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
		});
	});
});
