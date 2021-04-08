const mysql = require('mysql2');
const config = require('../config');

const connection = mysql.createPool({
	host: config.DB_HOST,
	user: config.DB_USER,
	database: config.DB_DATABASE,
	password: config.DB_PASSWORD
});


module.exports = connection.promise();
