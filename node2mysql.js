var db = require("mysql-native").createTCPClient('dev'); // localhost:3306 by default
db.auto_prepare = true;
function dump_rows(cmd)
{
	cmd.addListener('row', function(r) { console.dir(r); } );
}

db.auth("web_manager", "root", "fmp234");
dump_rows(db.query("select 1+1,2,3,'4',length('hello')"));
dump_rows(db.execute("select 1+1,2,3,'4',length(?)", ["hello"]));
db.close();

