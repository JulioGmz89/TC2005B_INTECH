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
module.exports.fetchProyecto  = function fetchProyecto(id_proyecto) {
	const query = `select id_proyecto, nombre_proyecto, descripcion_proyecto, date_format(fechaInicio_proyecto, '%d/%m/%Y') as fechaInicio_proyecto, cliente_proyecto, status_proyecto, userKey_proyecto, baseKey_proyecto from proyecto where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

/**
 * 
 * @param {*} email_usuario 
 * @returns Información de los proyectos en los que trabaja un usuario
 *          {id_proyecto, nombre_proyecto, descripcion_proyecto 
 *          fechaInicio_proyecto, status_proyecto} 
 */
module.exports.fetchProyectosUsuario  = function fetchProyectosUsuario(email_usuario) {
	const query = `select distinct P.id_proyecto, P.nombre_proyecto, P.descripcion_proyecto, date_format(P.fechaInicio_proyecto, '%Y-%m-%d') as fechaInicio_proyecto, P.status_proyecto from proyecto P, usuario_proyecto UP where UP.email_usuario = "${email_usuario}" and UP.id_proyecto = P.id_proyecto;`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Datos de los usuarios que participan en un proyecto
 *          {id_proyecto, email_usuario, nombre_usuario}
 */
module.exports.fetchIntegrantesProyecto  = function fetchIntegrantesProyecto(id_proyecto) {
	const query = `select distinct U.email_usuario, U.nombre_usuario from usuario U, usuario_proyecto UP where UP.id_proyecto = "${id_proyecto}" and UP.email_usuario = U.email_usuario;`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Numero de tareas completadas en un proyecto
 */
module.exports.fetchTareasCompletadasProyecto  = function fetchTareasCompletadasProyecto(id_proyecto) {
	const query = `select count(T.id_tarea) as 'tareas_completadas' from tarea T,tarea_casouso TCU where T.id_proyecto = "${id_proyecto}" and TCU.estado_tareaCasoUso = "DONE"`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Estado de la tarea
 */
module.exports.fetchStatusTareasProyecto  = function fetchStatusTareasProyecto(id_proyecto) {
	const query = `select TCU.estado_tareaCasoUso from tarea_casouso TCU,tarea T where TCU.id_tarea = T.id_tarea AND T.id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Tiempo estimado máximo
 */
module.exports.fetchTiempoEsProyecto  = function fetchTiempoEsProyecto(id_proyecto) {
	const query = `select max(C.maximo) as tiempo_estimado from puntosagiles PA, tarea_complejidad TC, complejidad C where PA.id_proyecto = ${id_proyecto} and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_complejidad = C.id_complejidad;`;
	return db.query(query);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Número total de tareas en un proyecto
 */
module.exports.fetchNumTareasProyecto  = function fetchNumTareasProyecto(id_proyecto) {
	const query = `select count(id_tarea) as 'todas_tareas' from tarea where id_proyecto = ${id_proyecto};`;
	return db.query(query);
}

/**
 * 
 * @returns Datos de todos los usuarios registrados
 */
module.exports.fetchTodosUsuarios  = function fetchTodosUsuarios() {
	const query = `select email_usuario, nombre_usuario from usuario`;
	return db.query(query);
}

/**
 * 
 * @param {*} nombre_proyecto 
 * @param {*} descripcion_proyecto 
 * @param {*} cliente_proyecto 
 * @returns Creacion de un nuevo proyecto
 */
module.exports.saveProyecto  = function saveProyecto(nombre_proyecto, descripcion_proyecto, cliente_proyecto) {
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
module.exports.saveUserProyecto  = function saveUserProyecto(id_proyecto, email_usuario) {
	return db.execute(`INSERT INTO usuario_proyecto (email_usuario, id_proyecto) VALUES(?, ?)`, [email_usuario, id_proyecto]);
}

/**
 * 
 * @param {*} id_proyecto 
 * @returns Información de los casos de uso pertenecientes a un proyecto
 */
module.exports.fetchCasosDeUsoProyecto  = function fetchCasosDeUsoProyecto(id_proyecto) {
	return db.query(`select id_casoUso, id_proyecto, complejidad_caso, nombre_caso, date_format(fechaInicio_caso, '%Y-%m-%d') as fechaInicio_caso, date_format(fechaFinalizacion_caso, '%Y-%m-%d') as fechaFinalizacion_caso, iteracion_caso from casouso CU where CU.id_proyecto = ${id_proyecto}`);
}

/**
 * 
 * @param {*} id_proyecto 
 * @param {*} id_casoUso 
 * @returns Nombre de los integrantes de un caso de uso
 */
module.exports.fetchIntegrantesCasoUso  = function fetchIntegrantesCasoUso(id_casoUso) {
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
module.exports.saveCasoUso  = function saveCasoUso(id_proyecto, nombre_casoUso, iteracion_casoUso, complejidad_casoUso) {
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
module.exports.fetchIntegrantesCasoUso  = function fetchIntegrantesCasoUso(id_casoUso) {
	return db.query(`select U.nombre_usuario from casouso CU, proyecto P, usuario U, usuario_proyecto UP where CU.id_casoUso = ${id_casoUso} and CU.id_proyecto = P.id_proyecto and P.id_proyecto = UP.id_proyecto and UP.email_usuario= U.email_usuario`)
}

/**
 *
 * @param {*} id_casoUso
 * @returns Llave del proyecto 
 */
module.exports.fetchKeyProyectos  = function fetchKeyProyectos(id_proyecto) {
	return db.query(`select userKey_proyecto, baseKey_proyecto from proyecto where id_proyecto = ${id_proyecto}`);
}

/**
 * 
 * @param {*} id_proyecto 
 * @param {*} nombre_tarea 
 * @param {*} id_categoria 
 * @returns Almacena la informacion de la tarea en la base de datos
 */
module.exports.saveTarea  = function saveTarea(id_proyecto, nombre_tarea, id_categoria) {
	return db.query(`INSERT INTO tarea (id_categoria, nombre_tarea, id_proyecto) VALUES (?, ?, ?)`,
		[id_categoria, nombre_tarea, id_proyecto]
	);
}

/**
 * 
 * @param {*} nombre_categoria 
 * @returns Almacena la informacion de la fase en la base de datos
 */
module.exports.saveCategoria  = function saveCategoria(nombre_categoria) {
	return db.query('INSERT INTO categoria (nombre_categoria) VALUES (?)',
		[nombre_categoria]
	);
}

/**
 * 
 * @returns  Nombre de las categorias
 */
module.exports.fetchCategoria  = function fetchCategoria() {
	return db.query('SELECT distinct nombre_categoria FROM categoria');
}

/**
 * 
 * @param {*} nombre_categoria 
 * @returns Id de la categoria
 */
module.exports.fetchIdCategoria  = function fetchIdCategoria(nombre_categoria) {
	return db.query(`SELECT id_categoria FROM categoria where nombre_categoria = "${nombre_categoria}"`);
}

module.exports.fetchTarea  = function fetchTarea() {
	return db.query(`SELECT * FROM tarea`);
}

module.exports.fetchTareaCU = function fetchTareaCU(id_proyecto) {
	return db.query(`SELECT T.id_tarea, T.nombre_tarea, C.nombre_categoria FROM tarea T, categoria C WHERE id_proyecto = "${id_proyecto}" AND T.id_categoria = C.id_categoria ORDER BY nombre_categoria ASC;`);
	//return db.query(`SELECT * FROM tarea WHERE id_proyecto = "${id_proyecto}"`);
}

module.exports.fetchCategoriasTareaCU = function fetchTareaCU(id_proyecto) {
	return db.query(`SELECT DISTINCT C.nombre_categoria FROM tarea T, categoria C WHERE id_proyecto = "${id_proyecto}" AND T.id_categoria = C.id_categoria ORDER BY nombre_categoria ASC;`);
}

module.exports.fetchTareaProyecto  = function fetchTareaProyecto(id_proyecto) {
	return db.query(`SELECT * FROM tarea WHERE id_proyecto = "${id_proyecto}"`);
}

module.exports.fetchTareasCategoria  = function fetchTareasCategoria(id_categoria, id_proyecto) {
	return db.query(`SELECT id_tarea, nombre_tarea FROM tarea WHERE id_categoria = "${id_categoria}" AND id_proyecto = "${id_proyecto}"`);
}

/**
 * 
 * @param {*} nombre_categoria 
 * @returns Almacena la informacion de la fase en la base de datos
 */
module.exports.saveTareaCasoUso  = function saveTareaCasoUso(id_tarea, id_casoUso) {
	return db.query('INSERT INTO tarea_casouso (id_tarea, id_casoUso) VALUES (?,?)',
		[id_tarea, id_casoUso]
	);
}

module.exports.saveValorPA  = function saveValorPA(min, max, complejidad) {
	return db.query('INSERT INTO complejidad (minimo, maximo, nivel) VALUES (?,?,?)',
		[min, max, complejidad]
	);
}

module.exports.saveTareaComplejidad  = function saveTareaComplejidad(id_tarea, id_complejidad, email_usuario) {
	return db.query('INSERT INTO tarea_complejidad (id_tarea, id_complejidad, email_usuario) VALUES (?,?,?)',
		[id_tarea, id_complejidad, email_usuario]
	);
}

module.exports.savePuntosAgiles  = function savePuntosAgiles(id_proyecto, email_usuario, id_tareaComplejidad) {
	return db.query('INSERT INTO puntosagiles (id_proyecto, email_usuario, id_tareaComplejidad) VALUES (?,?,?)',
		[id_proyecto, email_usuario, id_tareaComplejidad]
	);
}

module.exports.fetchCategoriaPts = function fetchCategoriaPts() {
    return db.query('SELECT * FROM categoria');
}

module.exports.fetchTareasCasoUso = function fetchTareasCasoUso(id_casoUso) {
	return db.query(`SELECT TCU.id_tarea FROM tarea_casouso TCU WHERE TCU.id_casoUso = ${id_casoUso};`);
}

module.exports.editProyecto = function editProyecto(nombre_proyecto, cliente_proyecto, descripcion_proyecto, id_proyecto) {
	return db.query(`UPDATE proyecto SET nombre_proyecto='${nombre_proyecto}', cliente_proyecto='${cliente_proyecto}', descripcion_proyecto='${descripcion_proyecto}' WHERE id_proyecto = ${id_proyecto};`);
}

module.exports.deleteIntegrante = function deleteIntegrante(id_proyecto, email_usuario) {
	return db.query(`DELETE FROM usuario_proyecto WHERE email_usuario = '${email_usuario}' AND id_proyecto = ${id_proyecto};`);
}

module.exports.fetchComplejidadesTarea = function fetchComplejidadesTarea(id_tarea) {
	return db.query(`SELECT * FROM complejidad C, tarea_complejidad TC WHERE TC.id_tarea = ${id_tarea} AND TC.id_complejidad = C.id_complejidad`);
}

module.exports.updateComplejidad = function updateComplejidad(id_complejidad, min, max) {
	return db.query(`UPDATE complejidad SET minimo = ${min}, maximo = ${max} WHERE id_complejidad = ${id_complejidad}`);
}

module.exports.fetchMaxIteracion = function fetchMaxIteracion(id_proyecto) {
	return db.query(`SELECT MAX(CU.iteracion_caso) AS "iteracion" FROM casouso CU WHERE CU.id_proyecto = ${id_proyecto};`);
}

module.exports.fetchUsuario = function fetchUsuario(email_usuario) {
	const query = `SELECT * FROM usuario WHERE email_usuario = "${email_usuario}"`;
	return db.query(query);
}
module.exports.fetchComplejidadesProyecto = function fetchComplejidadesProyecto(id_proyecto) {
	return db.query(`SELECT distinct TCU.id_tarea, CU.id_casoUso, CU.complejidad_caso FROM tarea_casouso TCU, casouso CU WHERE CU.id_proyecto = ${id_proyecto} AND CU.id_casoUso = TCU.id_casoUso`);
}
