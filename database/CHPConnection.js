const mySQL = require('mysql');

const chpConnection = mySQL.createConnection({
	debug: false,
	host: '127.0.0.1',
	port: '3306',
	user: 'crosales_cs355sp20',
	password: 'ro7175812',
	database: 'crosales_cs355sp20'
});

module.exports = chpConnection;
