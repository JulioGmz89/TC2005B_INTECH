const db = require("../utils/database");


function fetchProyecto(id_proyecto) {
	const query = `select * from proyecto where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

function fetchProyectosUsuario(email_usuario){
	const query = `select distinct P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, P.fechaInicio_proyecto, P.status_proyecto from proyecto P, usuario_proyecto UP where UP.email_usuario = "${email_usuario}" and UP.id_proyecto = P.id_proyecto;`;
	return db.query(query);
}

function fetchIntegrantesProyecto(id_proyecto) {
	const query = `select distinct UP.id_proyecto, U.email_usuario, U.nombre_usuario from usuario U, usuario_proyecto UP where UP.id_proyecto = "${id_proyecto}" and UP.email_usuario = U.email_usuario;`;
	return db.query(query);
}

function fetchTareasCompletadasProyecto(id_proyecto) {
	const query = `select count(T.id_tarea) as 'tareas_completadas' from tarea T where T.id_proyecto = "${id_proyecto}" and T.estado_tarea = "DONE"`;
	return db.query(query);
}

function fetchStatusTareasProyecto(id_proyecto) {
	const query = `select estado_tarea from tarea where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

function fetchTiempoEsProyecto(id_proyecto) {
	const query = `select max(C.maximo) as tiempo_estimado from puntosagiles PA, tarea_complejidad TC, complejidad C where PA.id_proyecto = ${id_proyecto} and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_complejidad = C.id_complejidad;`;
	return db.query(query);
}

function fetchNumTareasProyecto(id_proyecto){
	const query = `select count(id_tarea) as 'todas_tareas' from tarea where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

function fetchTodosUsuarios() {
	const query = `select* from usuario`;
	return db.query(query);
}

function saveProyecto(nombre_proyecto, descripcion_proyecto, cliente_proyecto) {
	let date = new Date();
	date = date.toISOString().slice(0, 10).replace('T', ' ');
	return db.query('INSERT INTO proyecto (nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto, cliente_proyecto) VALUES (?,?, ?, ?)',
		[nombre_proyecto, descripcion_proyecto, date ,cliente_proyecto]
	);
}

function saveUserProyecto(id_proyecto, email_usuario) {
	return db.execute(`INSERT INTO usuario_proyecto (email_usuario, id_proyecto) VALUES(?, ?)`, [email_usuario, id_proyecto]);
}

function fetchCasosDeUsoProyecto(id_proyecto) {
	return db.query(`select * from casouso CU where CU.id_proyecto = ${id_proyecto}`);
}

function fetchIntegrantesCasoUso(id_proyecto, id_casoUso) {
	return db.query(`select U.nombre_usuario from casouso CU, proyecto P, usuario U, usuario_proyecto UP where CU.id_casoUso = ${id_casoUso} and CU.id_proyecto = P.id_proyecto and P.id_proyecto = UP.id_proyecto and UP.email_usuario= U.email_usuario`);
}



module.exports.fetchProyecto = fetchProyecto;
module.exports.fetchProyectosUsuario = fetchProyectosUsuario;
module.exports.fetchIntegrantesProyecto = fetchIntegrantesProyecto;
module.exports.fetchTareasCompletadasProyecto = fetchTareasCompletadasProyecto;
module.exports.fetchTiempoEsProyecto = fetchTiempoEsProyecto;
module.exports.fetchStatusTareasProyecto = fetchStatusTareasProyecto;
module.exports.fetchNumTareasProyecto = fetchNumTareasProyecto;
module.exports.fetchTodosUsuarios = fetchTodosUsuarios;
module.exports.saveProyecto = saveProyecto;
module.exports.saveUserProyecto = saveUserProyecto;
module.exports.fetchCasosDeUsoProyecto = fetchCasosDeUsoProyecto;
module.exports.fetchIntegrantesCasoUso = fetchIntegrantesCasoUso;




// Variables que tenemos que enviar en el render:
// Nombre proyecto
// Integrantes
// Tareas completadas
// Tiempo estimado