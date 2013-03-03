var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'dev',
	database : 'web_manager',
	user     : 'root',
	password : 'fmp234',
});

connection.connect();

connection.query('SELECT id,email from app order by id desc limit 150', function(err, rows, fields) {
	if (err) throw err;
	console.log(rows);
});

connection.end();
