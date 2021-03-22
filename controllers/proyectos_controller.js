const models = require('../models/proyectos');

async function getProyectos(request, response, next) {
    const email_usuario = '';
    const proyectos = await models.fetchProyectosUsuario(email_usuario);
    console.log(proyectos);
    const dataProyectos = [];
    proyectos.forEach( async proyecto => {
        const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
        const tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
        const tiempoEstim = await models.fetchTiempoEsProyecto(proyecto.id_proyecto);
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


module.exports.getProyectos = getProyectos;