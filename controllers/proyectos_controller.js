const models = require('../models/proyectos');
const contextInit = require('../utils/context_manager');


async function getProyectos(request, response, next) {
    let context = await contextInit('Proyectos');

    const email_usuario = 'Daniel@hotmail.com';
    const proyectos = await models.fetchProyectosUsuario(email_usuario);
    const usuarios = await models.fetchTodosUsuarios();

    var dataProyectos = [];
    for (let i=0; i<proyectos[0].length; i++){
        let proyecto = proyectos[0][i];
        const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
        const tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
		const tareasTotales = await models.fetchNumTareasProyecto(proyecto.id_proyecto);
        const tiempoEstim = await models.fetchTiempoEsProyecto(proyecto.id_proyecto);
        const data = {
            idProyecto: proyecto.id_proyecto,
            nombreProyecto: proyecto.nombre_proyecto,
            nuTareasCompletadas: tareasCompl[0].length,
			nuTareasTotales: tareasTotales[0][0]['todas_tareas'],
            tiempoEstimado: tiempoEstim[0][0]['tiempo_estimado'].toFixed(2),
            integrantes: integrantes[0]
        };
        dataProyectos.push(data);
    }

    context.usuario = usuarios[0];
    context.proyectos = dataProyectos;
    response.render('proyectos', context);
};


exports.postNuevoProyecto = (request, response, next) => {
    let context = contextInit();

    const nombreProyecto = request.body.nombreProyecto;
    const descripcionProyecto = request.body.descripcionProyecto;
    const clienteProyecto = request.body.clienteProyecto;

    models.saveProyecto(nombreProyecto, descripcionProyecto, clienteProyecto)
        .then(() => {
            response.redirect('/proyectos');
        }).catch(err => console.log(err));;

};


module.exports.getProyectos = getProyectos;