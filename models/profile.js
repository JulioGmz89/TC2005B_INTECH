const db = require("../utils/database");


function fetchProyectos(email_usuario) {
    const query = `select count(P.id_proyecto) from Proyecto P, PuntosAgiles PA where P.id_proyecto = PA.id_proyecto and PA.email_usuario = "${email_usuario}"`;
    return db.query(query);
}

function fetchTodosProyectos(email_usuario) {
    const query = `select count(P.id_proyecto) from Proyecto P`;
    return db.query(query);
}

module.exports.fetchProyectos = fetchProyectos;
module.exports.fetchTodosProyectos = fetchTodosProyectos;



