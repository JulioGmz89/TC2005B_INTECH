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
	let usuariosIntegrantes = [];

	for (let i = 0; i < integrantes[0].length; i++) {
		usuariosIntegrantes.push(integrantes[0][i].email_usuario);
	}

	let tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
	let tareasTotales = await models.fetchNumTareasProyecto(proyecto.id_proyecto);
	let tiempoEstim = await models.fetchTiempoEsProyecto(proyecto.id_proyecto);
	tareasCompl = (tareasCompl[0][0]['tareas_completadas']);
	tareasTotales = (tareasTotales[0][0]['todas_tareas'] == null) ? 0 : tareasTotales[0][0]['todas_tareas'];
	tiempoEstim = (tiempoEstim[0][0]['tiempo_estimado'] == null) ? 0 : tiempoEstim[0][0]['tiempo_estimado'].toFixed(2);

	context['proyecto'] = proyecto;
	context['tareasCompletadas'] = tareasCompl;
	context['tareasTotales'] = tareasTotales;
	context['tiempoEstimado'] = tiempoEstim;
	context['fechaInicio'] = proyecto.fechaInicio_proyecto;
	context['cliente'] = proyecto.cliente_proyecto;
	context['integrantes'] = integrantes[0];
	context['descripcion'] = proyecto.descripcion_proyecto;
	context['usuariosIntegrantes'] = usuariosIntegrantes;
	context.usuario = usuarios[0];

	response.render('Proyecto1', context);
};

exports.postEditarProyecto = async (request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	const nombreProyecto = request.body.nombreProyecto;
	const descripcionProyecto = request.body.descripcionProyecto;
	const clienteProyecto = request.body.clienteProyecto;

	const integrantes = await models.fetchIntegrantesProyecto(id_proyecto);
	let integrantesActuales = [];
	for (let i = 0; i < integrantes[0].length; i++) {
		integrantesActuales.push(integrantes[0][i].email_usuario);
	}

	let integrantesNuevos = {};
	for (let key in request.body) {
		if (key.includes('id_usuario')) {
			integrantesNuevos[request.body[key]] = request.body[key];
		}
	}

	if (nombreProyecto.length != 0 && descripcionProyecto.length != 0 && clienteProyecto.length != 0 && Object.keys(integrantesNuevos).length != 0) {

		const borrarIntegrantes = [];
		const agregarIntegrantes = [];

		for (let j = 0; j < integrantesActuales.length; j++) {
			if (!(integrantesActuales[j] in integrantesNuevos)) {
				borrarIntegrantes.push(integrantesActuales[j]);
			} else {
				delete integrantesNuevos[integrantesActuales[j]];
			}
		}

		const llavesIntegrantesNuevos = Object.keys(integrantesNuevos);
		for (let k = 0; k < llavesIntegrantesNuevos.length; k++) {
			agregarIntegrantes.push(integrantesNuevos[llavesIntegrantesNuevos[k]]);
		}
		console.log(borrarIntegrantes);
		console.log(agregarIntegrantes);

		borrarIntegrantes.forEach(user => {
			models.deleteIntegrante(id_proyecto, user).catch(error => console.log(error));
		});

		agregarIntegrantes.forEach(integrante => {
			models.saveUserProyecto(id_proyecto, integrante).catch(error => console.log(error));
		});

		await models.editProyecto(nombreProyecto, clienteProyecto, descripcionProyecto, id_proyecto);

		request.flash('success', 'Datos guardados satisfactoriamente.');
		response.redirect('/proyecto/' + id_proyecto);

	} else {
		request.flash('errorCampos', 'Faltan campos por llenar.');
		response.redirect('/proyecto/' + id_proyecto);
	}

}