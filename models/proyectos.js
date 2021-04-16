/**
 * @brief Consultas para el manejo de los proyectos
 */

/**
 * @db -> genera la conexión con la base de datos
 */
const db = require("../utils/database");

/**
 * 
 * @param {*} id_proyecto 
 * @returns Todos los registros de la tabla de proyectos a los cuales les corresponda @id_proyecto
 */
function fetchProyecto(id_proyecto) {
	const query = `select * from proyecto where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

/**
 * 
 * @param {*} email_usuario 
 * @returns Información de los proyectos en los que trabaja un usuario
 *          {id_proyecto, nombre_proyecto, descripcion_proyecto 
 *          fechaInicio_proyecto, status_proyecto} 
 */
function fetchProyectosUsuario(email_usuario) {
	const query = `select distinct P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, P.fechaInicio_proyecto, P.status_proyecto from proyecto P, usuario_proyecto UP where UP.email_usuario = "${email_usuario}" and UP.id_proyecto = P.id_proyecto;`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Datos de los usuarios que participan en un proyecto
 *          {id_proyecto, email_usuario, nombre_usuario}
 */
function fetchIntegrantesProyecto(id_proyecto) {
	const query = `select distinct UP.id_proyecto, U.email_usuario, U.nombre_usuario from usuario U, usuario_proyecto UP where UP.id_proyecto = "${id_proyecto}" and UP.email_usuario = U.email_usuario;`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Numero de tareas completadas en un proyecto
 */
function fetchTareasCompletadasProyecto(id_proyecto) {
	const query = `select count(T.id_tarea) as 'tareas_completadas' from tarea T,tarea_casouso TCU where T.id_proyecto = "${id_proyecto}" and TCU.estado_tareaCasoUso = "DONE"`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Estado de la tarea
 */
function fetchStatusTareasProyecto(id_proyecto) {
	const query = `select TCU.estado_tareaCasoUso from tarea_casouso TCU,tarea T where TCU.id_tarea = T.id_tarea AND T.id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Tiempo estimado máximo
 */
function fetchTiempoEsProyecto(id_proyecto) {
	const query = `select max(C.maximo) as tiempo_estimado from puntosagiles PA, tarea_complejidad TC, complejidad C where PA.id_proyecto = ${id_proyecto} and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_complejidad = C.id_complejidad;`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Número total de tareas en un proyecto
 */
function fetchNumTareasProyecto(id_proyecto) {
	const query = `select count(id_tarea) as 'todas_tareas' from tarea where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

/**
 * 
 * @returns Datos de todos los usuarios registrados
 */
function fetchTodosUsuarios() {
	const query = `select* from usuario`;
	return db.query(query);
}

/**
 * 
 * @param {*} nombre_proyecto 
 * @param {*} descripcion_proyecto 
 * @param {*} cliente_proyecto 
 * @returns Creacion de un nuevo proyecto
 */
function saveProyecto(nombre_proyecto, descripcion_proyecto, cliente_proyecto) {
	let date = new Date();
	date = date.toISOString().slice(0, 10).replace('T', ' ');
	return db.query('INSERT INTO proyecto (nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto, cliente_proyecto) VALUES (?,?, ?, ?)',
		[nombre_proyecto, descripcion_proyecto, date, cliente_proyecto]
	);
}

/**
 * 
 * @param {*} id_proyecto 
 * @param {*} email_usuario 
 * @returns Registro de un nuevo usuario
 */
function saveUserProyecto(id_proyecto, email_usuario) {
	return db.execute(`INSERT INTO usuario_proyecto (email_usuario, id_proyecto) VALUES(?, ?)`, [email_usuario, id_proyecto]);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Información de los casos de uso pertenecientes a un proyecto
 */
function fetchCasosDeUsoProyecto(id_proyecto) {
	return db.query(`select * from casouso CU where CU.id_proyecto = ${id_proyecto}`);
}

/**
 * 
 * @param {*} id_proyecto 
 * @param {*} id_casoUso 
 * @returns Nombre de los integrantes de un caso de uso
 */
function fetchIntegrantesCasoUso(id_casoUso) {
	return db.query(`select U.nombre_usuario from casouso CU, proyecto P, usuario U, usuario_proyecto UP where CU.id_casoUso = ${id_casoUso} and CU.id_proyecto = P.id_proyecto and P.id_proyecto = UP.id_proyecto and UP.email_usuario= U.email_usuario`);
}


/**
 * 
 * @param {*} id_proyecto 
 * @param {*} nombre_casoUso 
 * @param {*} iteracion_casoUso 
 * @param {*} complejidad_casoUso
 * @returns Almacena la informacion de los casos de uso en la base de datos
 */
function saveCasoUso(id_proyecto, nombre_casoUso, iteracion_casoUso, complejidad_casoUso) {
	let date = new Date();
	date = date.toISOString().slice(0, 10).replace('T', ' ');
	return db.query('INSERT INTO casouso (id_proyecto, nombre_caso, fechaInicio_caso, complejidad_caso, iteracion_caso) VALUES (?, ?, ?, ?, ?)',
		[id_proyecto, nombre_casoUso, date, complejidad_casoUso, iteracion_casoUso]
	);
}

/**
 * 
 * @param {*} id_casoUso 
 * @returns Nombre de los integrantes de caso de uso
 */
function fetchIntegrantesCasoUso(id_casoUso) {
	return db.query(`select U.nombre_usuario from casouso CU, proyecto P, usuario U, usuario_proyecto UP where CU.id_casoUso = ${id_casoUso} and CU.id_proyecto = P.id_proyecto and P.id_proyecto = UP.id_proyecto and UP.email_usuario= U.email_usuario`)
}

/**
 *
 * @param {*} id_casoUso
 * @returns Llave del proyecto 
 */
function fetchKeyProyectos(id_proyecto) {
	return db.query(`select userKey_proyecto, baseKey_proyecto from proyecto where id_proyecto = ${id_proyecto}`);
}

/**
 * 
 * @param {*} id_proyecto 
 * @param {*} nombre_tarea 
 * @param {*} id_categoria 
 * @returns Almacena la informacion de la tarea en la base de datos
 */
function saveTarea(id_proyecto, nombre_tarea, id_categoria) {
	return db.query(`INSERT INTO tarea (id_categoria, nombre_tarea, id_proyecto) VALUES (?, ?, ?)`,
		[id_categoria, nombre_tarea, id_proyecto]
	);
}

/**
 * 
 * @param {*} nombre_categoria 
 * @returns Almacena la informacion de la fase en la base de datos
 */
function saveCategoria(nombre_categoria) {
	return db.query('INSERT INTO categoria (nombre_categoria) VALUES (?)',
		[nombre_categoria]
	);
}

/**
 * 
 * @returns  Nombre de las categorias
 */
function fetchCategoria() {
	return db.query('SELECT distinct nombre_categoria FROM categoria');
}

/**
 * 
 * @param {*} nombre_categoria 
 * @returns Id de la categoria
 */
function fetchIdCategoria(nombre_categoria) {
	return db.query(`SELECT id_categoria FROM categoria where nombre_categoria = "${nombre_categoria}"`);
}

function fetchTarea() {
	return db.query(`SELECT * FROM tarea`);
}

function fetchTareaProyecto(id_proyecto) {
	return db.query(`SELECT * FROM tarea WHERE id_proyecto = "${id_proyecto}"`);
}

function fetchTareasCategoria(id_categoria, id_proyecto) {
	return db.query(`SELECT nombre_tarea FROM tarea WHERE id_categoria = "${id_categoria}" AND id_proyecto = "${id_proyecto}"`);
}


/**
 * 
 * @param {*} nombre_categoria 
 * @returns Almacena la informacion de la fase en la base de datos
 */
function saveTareaCasoUso(id_tarea, id_casoUso) {
	return db.query('INSERT INTO tarea_casouso (id_tarea, id_casoUso) VALUES (?,?)',
		[id_tarea, id_casoUso]
	);
}

function fetchCategoriaPts() {
	return db.query('SELECT * FROM categoria');
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
module.exports.saveCasoUso = saveCasoUso;
module.exports.fetchIntegrantesCasoUso = fetchIntegrantesCasoUso;
module.exports.fetchKeyProyectos = fetchKeyProyectos;
module.exports.saveCategoria = saveCategoria;
module.exports.saveTarea = saveTarea;
module.exports.fetchCategoria = fetchCategoria;
module.exports.fetchIdCategoria = fetchIdCategoria;
module.exports.fetchTarea = fetchTarea;
module.exports.fetchTareaProyecto = fetchTareaProyecto;
module.exports.fetchTareasCategoria = fetchTareasCategoria;
module.exports.saveTareaCasoUso = saveTareaCasoUso;
module.exports.fetchCategoriaPts = fetchCategoriaPts;



// Variables que tenemos que enviar en el render:
// Nombre proyecto
// Integrantes
// Tareas completadas
// Tiempo estimado