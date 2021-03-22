const db = require('./database');


function fetchProyectosUsuario(email_usuario) {
    const query = `select  id_proyecto, nombre_proyecto, descripcion_proyecto, fechaInicio_proyecto from Proyecto P, Usuario_Proyecto UP where UP.email_usuario = '${email_usuario}' and UP.id_proyecto = P.proyecto;`;
    return db.query(query);
}

function fetchIntegrantesProyecto(id_proyecto) {
    const query = `select U.email_usuario, U.nombre_usuario from Usuario U, Usuario_Proyecto UP where UP.id_proyecto = '${id_proyecto}' and UP.email_usuario = U.email_usuario;`;
    return db.query(query);
}

function fetchTareasCompletadasProyecto(id_proyecto) {
    const query = `select T.id_tarea, T.nombre_tarea from Tarea T, where T.id_proyecto = '${id_proyecto}' and T.estado_tarea = 'DONE';`;
    return db.query(query);
}

function fetchTiempoEsProyecto(id_proyecto) {
    const query = `select max(C.maximo) as tiempo_estimado from PuntosAgiles PA, Tarea_Complejidad TC, Complejidad C where PA.id_proyecto = ${id_proyecto} and PA.id_tareaComplejidad = TC.id_tareaComplejidad and TC.id_complejidad = C.id_complejidad;`;
    return db.query(query);
}


// Variables que tenemos que enviar en el render:
// Nombre proyecto
// Integrantes
// Tareas completadas
// Tiempo estimado