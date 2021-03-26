const db = require("./database");


function fetchProyecto(id_proyecto) {
	const query = `select * from Proyecto where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

function fetchProyectosUsuario(email_usuario){
	const query = `select distinct P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, P.fechaInicio_proyecto from Proyecto P, Usuario_Proyecto UP where UP.email_usuario = "${email_usuario}" and UP.id_proyecto = P.id_proyecto;`;
	return db.query(query);
}

function fetchIntegrantesProyecto(id_proyecto) {
	const query = `select distinct UP.id_proyecto, U.email_usuario, U.nombre_usuario from Usuario U, Usuario_Proyecto UP where UP.id_proyecto = "${id_proyecto}" and UP.email_usuario = U.email_usuario;`;
	return db.query(query);
}

function fetchTareasCompletadasProyecto(id_proyecto) {
	const query = `select count(T.id_tarea) as 'tareas_completadas' from Tarea T where T.id_proyecto = "${id_proyecto}" and T.estado_tarea = "DONE";`;
	const query2 = `select  `;
	return db.query(query);
}

function fetchTiempoEsProyecto(id_proyecto) {
	const query = `select max(C.maximo) as tiempo_estimado from PuntosAgiles PA, Tarea_Complejidad TC, Complejidad C where PA.id_proyecto = ${id_proyecto} and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_complejidad = C.id_complejidad;`;
	return db.query(query);
}

function fetchNumTareasProyecto(id_proyecto){
	const query = `select distinct count(id_tarea) as 'todas_tareas' from Tarea where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

function fetchTodosUsuarios() {
	const query = `select* from usuario`;
	return db.query(query);
}

function saveProyecto(nombre_proyecto, descripcion_proyecto, cliente_proyecto) {
	let date = new Date();
	date = date.toISOString().slice(0, 10).replace('T', ' ');
	return db.execute('INSERT INTO proyecto (nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto, cliente_proyecto) VALUES (?,?, ?, ?)',
		[nombre_proyecto, descripcion_proyecto, date ,cliente_proyecto]
	);
}

module.exports.fetchProyecto = fetchProyecto;
module.exports.fetchProyectosUsuario = fetchProyectosUsuario;
module.exports.fetchIntegrantesProyecto = fetchIntegrantesProyecto;
module.exports.fetchTareasCompletadasProyecto = fetchTareasCompletadasProyecto;
module.exports.fetchTiempoEsProyecto = fetchTiempoEsProyecto;
module.exports.fetchNumTareasProyecto = fetchNumTareasProyecto;
module.exports.fetchTodosUsuarios = fetchTodosUsuarios;
module.exports.saveProyecto = saveProyecto;




// Variables que tenemos que enviar en el render:
// Nombre proyecto
// Integrantes
// Tareas completadas
// Tiempo estimado