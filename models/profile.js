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
module.exports.fetchProyectos = function fetchProyectos(email_usuario) {
    const query = `SELECT count(UP.id_proyecto) FROM usuario_proyecto UP WHERE UP.email_usuario = '${email_usuario}'`;
    return db.query(query);
}

/**
 * 
 * @param {*} email_usuario 
 * @returns Cantidad de proyectos creados en la empresa
 */
module.exports.fetchTodosProyectos = function fetchTodosProyectos(email_usuario) {
    const query = `select count(P.id_proyecto) from proyecto P`;
    return db.query(query);
}

module.exports.fetchUsuario = function fetchUsuario(email_usuario) {
    const query = `SELECT * FROM usuario WHERE email_usuario = "${email_usuario}"`;
    return db.query(query);
}

module.exports.updateUsuario = function updateUsuario(nombre_usuario, email_usuario) {
    const query = `UPDATE usuario SET nombre_usuario = "${nombre_usuario}" WHERE email_usuario = "${email_usuario}"`;
    return db.query(query);
}

module.exports.updateUsuario = function updateUsuario(nombre_usuario, email_usuario) {
    const query = `UPDATE usuario SET nombre_usuario = "${nombre_usuario}" WHERE email_usuario = "${email_usuario}"`;
    return db.query(query);
}

module.exports.updatePassword = function updatePassword(password_usuario, email_usuario) {
    const query = `UPDATE usuario SET password_usuario = "${password_usuario}" WHERE email_usuario = "${email_usuario}"`;
    return db.query(query);
}



