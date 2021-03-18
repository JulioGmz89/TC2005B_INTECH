const db = require('./database');


async function getUsuario(args={}){
	let subquery = '';
	const keys = Object.keys(args);
	if (keys.length > 0){
		subquery += 'where ';
	}
	keys.forEach( key => {
		subquery += `${key} = ${JSON.stringify(args[key])} `;
	});
	const query = `select email_usuario, nombre_usuario from Usuario ${subquery};`;
	let response = '';
	return [rows, fields] = await db.execute(query);
}


// function getProyecto () {
// 	const query = `select id_proyecto, nombre_proyecto, descripcion_proyecto, cliente_proyecto, status_proyecto from  Proyecto ${proyectos};`;
// 	// Ejecutar query
// 	const response;
// 	return response;	
// }

getUsuario()
.then( (rows, fields) => {
	console.log(rows);
});

getUsuario({email_usuario: 'Daniel@hotmail.com'})
.then( (rows, fields) => {
	console.log(rows);
});

/* 

-- USUARIO
select email_usuario, nombre_usuario from Usuario;


-- DASHBOARD (home) --------------------------------------------------
-- obtener la info de todos los proyectos
select id_proyecto, nombre_proyecto, descripcion_proyecto, cliente_proyecto, status_proyecto from  Proyecto;
    -- Subconsulta
    where status_proyecto = true;

-- obtener los integrantes
select nombre_usuario from Usuario U, Usuario_Proyecto UP
where UP.email_usuario = U.email_usuario and UP.id_proyecto = '1';

-- query: horas faltantes
-- obtener la info de los proyectos en los que está incrito el usuario
select P.id_proyecto, P.nombre_proyecto from Proyecto P, Usuario_Proyecto UP
where P.id_proyecto = UP.id_proyecto and up.email_usuario = 'leo@gmail.com';

-- PROYECTO (proyecto-home) --------------------------------------------------
select id_proyecto, nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto from  Proyecto
where id_proyecto = '1';
select U.email_usuario
from Usuario_Proyecto UP, Usuario U
where UP.id_proyecto = '1' and U.email_usuario = UP.email_usuario;
-- query: dias restantes
-- query airtable:


*/