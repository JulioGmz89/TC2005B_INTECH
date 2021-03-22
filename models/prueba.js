const fetchUsuario = require('./usuario');


fetchUsuario({nombre_usuario:'Leonel Messi'})
.then( ([rows, fields]) => {
	console.log(rows);
});


fetchUsuario()
.then( ([rows, fields]) => {
	console.log(rows);
});


