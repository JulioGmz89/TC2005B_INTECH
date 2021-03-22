const models = require('../models/proyectos');

async function getProyectos(request, response, next) {
    const email_usuario = 'Daniel@hotmail.com';
    const proyectos = await models.fetchProyectosUsuario(email_usuario);
    var dataProyectos = [];
    await proyectos[0].forEach( async proyecto => {
        // console.log('1', dataProyectos.length);
        const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
        const tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
        const tiempoEstim = await models.fetchTiempoEsProyecto(proyecto.id_proyecto);
        const data = {
            idProyecto: proyecto.id_proyecto,
            nombreProyecto: proyecto.nombre_proyecto,
            nuTareasCompletadas: tareasCompl[0].length,
            tiempoEstimado: tiempoEstim[0][0]['tiempo_estimado'],
            integrantes: integrantes[0]
        };
        console.log(dataProyectos.length);
        dataProyectos.push(data);
        // console.log(dataProyectos.length);
    });
    console.log('\n2',  dataProyectos);
    response.render('proyectos', {
        title: 'Puntos Agiles',
        proyectos: dataProyectos
    });
};


module.exports.getProyectos = getProyectos;