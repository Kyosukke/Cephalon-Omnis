const sql = require("sqlite");
sql.open("./wf-info.sqlite");

module.exports = "Contains multiple actions to manage database";

function generateDatabase () {
	sql.run("CREATE TABLE IF NOT EXISTS 
}

sql.get(`SELECT * FROM user WHERE userId = "${message.author.id}"`).then(row => {
}).catch(() => {
	generateDatabase();
});