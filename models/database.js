const mysql = require('mysql2');
// require('dotenv').config();

const connection = mysql.createPool({
	host: 'us-cdbr-east-03.cleardb.com', //process.env.DB_HOST,
	user: 'b0ff57321e81f0', //process.env.DB_USER,
	database: 'heroku_265358198a20512', //process.env.DB_NAME,
	password: '6b5ad8b1'//process.env.DB_PASSWORD
});


module.exports = connection.promise();
