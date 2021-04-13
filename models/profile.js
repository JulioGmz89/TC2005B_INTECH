/**
 * @brief Consultas para el manejo del perfil
 */

/**
 * @db conexión con la base de datos
 */
const db = require("../utils/database");

/**
 * 
 * @param {*} email_usuario 
 * @returns Cantidad de proyectos en los que participo el usuario
 */
function fetchProyectos(email_usuario) {
    const query = `select count(P.id_proyecto) from proyecto P, puntosagiles PA where P.id_proyecto = PA.id_proyecto and PA.email_usuario = "${email_usuario}"`;
    return db.query(query);
}

/**
 * 
 * @param {*} email_usuario 
 * @returns Cantidad de proyectos creados en la empresa
 */
function fetchTodosProyectos(email_usuario) {
    const query = `select count(P.id_proyecto) from proyecto P`;
    return db.query(query);
}

module.exports.fetchProyectos = fetchProyectos;
module.exports.fetchTodosProyectos = fetchTodosProyectos;



