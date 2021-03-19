const mysql = require('mysql2');
// require('dotenv').config();

const connection = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com', //process.env.DB_HOST,
    user: 'b0ff57321e81f0', //process.env.DB_USER,
    database: 'heroku_265358198a20512', //process.env.DB_NAME,
    password: '6b5ad8b1'//process.env.DB_PASSWORD
});

// const connection = pool.promise();
module.exports = connection;


function fetchUsuario(args={}){
	let subquery = '';
	const keys = Object.keys(args);
	if (keys.length > 0){
		subquery += 'where ';
	}
	keys.forEach( key => {
		subquery += `${key} = ${JSON.stringify(args[key])} `;
	});
	const query = `select email_usuario, nombre_usuario from Usuario ${subquery};`;
    let result = [];
    connection.connect();
    connection.query(query).then(function(err, rows, fields) {
            if (err) console.log(err);
            console.log(rows);
            result = rows;
            return result;
        }
    );
    connection.end();
    
}

console.log(fetchUsuario());