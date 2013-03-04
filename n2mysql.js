var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'dev',
	database : 'web_manager',
	user     : 'root',
	password : 'fmp234',
});

connection.connect();

connection.query('SELECT id,email from app order by id desc limit 15', function(err, rows, fields) {
	if (err) throw err;
	console.log(rows);
	rows.forEach(function(col,index,a) {
		console.log(col.id);
		console.log(col.email);
	});
});

connection.end();
