const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
const { response } = require('express');
router.use(express.static(path.join(__dirname, 'public')));



// GENERAL
exports.getProyectoX = async (request, response, next) => {
	let context = await contextInit('Proyecto ' + request.params.id_proyecto, request);
	let proyecto = await models.fetchProyecto(request.params.id_proyecto);
	proyecto = proyecto[0][0];
	const usuarios = await models.fetchTodosUsuarios();

	const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
	let tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
	let tareasTotales = await models.fetchNumTareasProyecto(proyecto.id_proyecto);
	let tiempoEstim = await models.fetchTiempoEsProyecto(proyecto.id_proyecto);
	tareasCompl = (tareasCompl[0].length == 0) ? 0 : tareasCompl[0].length;
	tareasTotales = (tareasTotales[0][0]['todas_tareas'] == null) ? 0 : tareasTotales[0][0]['todas_tareas'];
	tiempoEstim = (tiempoEstim[0][0]['tiempo_estimado'] == null) ? 0 : tiempoEstim[0][0]['tiempo_estimado'].toFixed(2);

	context['proyecto'] = proyecto;
	context['tareasCompletadas'] = tareasCompl;
	context['tareasTotales'] = tareasTotales;
	context['fechaInicio'] = proyecto.fechaInicio_proyecto;
	context['cliente'] = proyecto.cliente_proyecto;
	context['integrantes'] = integrantes[0];
	context['descripcion'] = proyecto.descripcion_proyecto;
	context.usuario = usuarios[0];

	response.render('Proyecto1', context);
};

exports.postEditarProyecto = async (request, response, next) => {

	const id_proyecto = request.params.id_proyecto;
	const nombreProyecto = request.body.nombreProyecto;
    const descripcionProyecto = request.body.descripcionProyecto;
    const clienteProyecto = request.body.clienteProyecto;
    const integrantes = [];

    for (let key in request.body) {
        if (key.includes('id_usuario')) {
            integrantes.push(request.body[key]);
        }
    }


    const registro = await models.editProyecto(nombreProyecto, clienteProyecto, descripcionProyecto, id_proyecto);
    // const id_proyecto = registro[0]['insertId'];
    // integrantes.forEach(integrante => {
    //     models.saveUserProyecto(id_proyecto, integrante).catch(error => console.log(error));
    // });

    response.redirect('/proyecto/' + id_proyecto);

}