var db = require("mysql-native").createTCPClient('dev'); // localhost:3306 by default
db.auto_prepare = true;
function dump_rows(cmd) {
	cmd.addListener('row', function(r) { console.dir(r); } );
}

db.auth("web_manager", "root", "fmp234");
dump_rows(db.query("select id,email from app order by id desc limit 150"));
db.close();

