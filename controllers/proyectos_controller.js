const models = require('../models/proyectos');

export async function getProyectos(request, response, next) {
    const email_usuario = '';
    const proyectos = await models.fetchProyectosUsuario(email_usuario);
    const dataProyectos = [];
    proyectos.forEach( proyecto => {
        const integrantes = await fetchIntegrantesProyecto(proyecto.id_proyecto);
        const tareasCompl = await fetchTareasCompletadasProyecto(proyecto.id_proyecto);
        const tiempoEstim = await fetchTiempoEsProyecto(proyecto.id_proyecto);
        const data = {
            idProyecto: id_proyecto,
            nombreProyecto: nombre_proyecto,
            nuTareasCompletadas: tareasCompl.length,
            tareasCompletadas: tareasCompl,
            tiempoEstimado: tiempoEstim,
            integrantes: integrantes
        };
        dataProyectos.push(data);
    });
    response.render('proyectos', {
        title: 'Puntos Agiles',
        proyectos: dataProyectos
    });
};