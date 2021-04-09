const models = require('../models/proyectos');
const contextInit = require('../utils/context_manager');


async function getProyectos(request, response, next) {
    let context = await contextInit('Proyectos', request);

    const email_usuario = 'Daniel@hotmail.com';
    const proyectos = await models.fetchProyectosUsuario(email_usuario);
    const usuarios = await models.fetchTodosUsuarios();

    var dataProyectos = [];
    for (let i = 0; i < proyectos[0].length; i++) {
        let proyecto = proyectos[0][i];
        const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
        let tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
        let tareasTotales = await models.fetchNumTareasProyecto(proyecto.id_proyecto);
        let tiempoEstim = await models.fetchTiempoEsProyecto(proyecto.id_proyecto);
        tareasCompl = (tareasCompl[0][0]['tareas_completadas'] == null) ? 0 : tareasCompl[0][0]['tareas_completadas'];
        tareasTotales = (tareasTotales[0][0]['todas_tareas'] == null) ? 0 : tareasTotales[0][0]['todas_tareas'];
        tiempoEstim = (tiempoEstim[0][0]['tiempo_estimado'] == null) ? 0 : tiempoEstim[0][0]['tiempo_estimado'].toFixed(2);

        const data = {
            idProyecto: proyecto.id_proyecto,
            nombreProyecto: proyecto.nombre_proyecto,
            nuTareasCompletadas: tareasCompl,
            nuTareasTotales: tareasTotales,
            tiempoEstimado: tiempoEstim,
            integrantes: integrantes[0]
        };
        dataProyectos.push(data);
    }

    context.usuario = usuarios[0];
    context.proyectos = dataProyectos;
    response.render('proyectos', context);
};


exports.postNuevoProyecto = async (request, response, next) => {
    let context = contextInit();

    const nombreProyecto = request.body.nombreProyecto;
    const descripcionProyecto = request.body.descripcionProyecto;
    const clienteProyecto = request.body.clienteProyecto;
    const integrantes = [];

    for (let key in request.body) {
        if (key.includes('id_usuario')) {
            integrantes.push(request.body[key]);
        }
    }


    const registro = await models.saveProyecto(nombreProyecto, descripcionProyecto, clienteProyecto);
    const id_proyecto = registro[0]['insertId'];
    integrantes.forEach(integrante => {
        models.saveUserProyecto(id_proyecto, integrante).catch(error => console.log(error));
    });

    response.redirect('/proyectos');
};

module.exports.getProyectos = getProyectos;