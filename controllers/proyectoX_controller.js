const airtableModel = require('../models/airtable');
const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
router.use(express.static(path.join(__dirname, 'public')));


exports.getProyectoX = async (request, response, next) => {
	let context = await contextInit('Proyecto: ${request.params.id_proyecto}', request);
	//let context = await contextInit();
	//context.title = `Proyecto: ${request.params.id_proyecto}`;
	let proyecto = await models.fetchProyecto(request.params.id_proyecto);
	proyecto = proyecto[0][0];

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

	response.render('Proyecto1', context);
};


exports.getPA = async (request, response, next) => {
	let context = await contextInit('Puntos Ágiles', request);
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];

	response.render('PtsAgiles', context);
};


exports.getCasoUso = async (request, response, next) => {
	let context = await contextInit('Casos de Uso', request);
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];
	
	response.render('CasosUso', context);
};


exports.getAirtable = async (request, response, next) => {
	let context = await contextInit('Conexión con Airtable', request);

	const idProyecto = request.params.id_proyecto;
	let keys = await airtableModel.fetchKeys(idProyecto);
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];

	context.data = {
			idProyecto : idProyecto,
			userKey : keys[0][0]['userKey_proyecto'],
			baseKey : keys[0][0]['baseKey_proyecto'],
	}

	response.render('Airtable', context);
};


exports.postAirtable = async (request, response, next) => {
	const idProyecto = request.params.id_proyecto;
	const keys = await airtableModel.fetchKeys(idProyecto);
	const newObj = new airtableModel(idProyecto, request.body['user-key'], request.body['base-key']);
	newObj.save();
	response.redirect(200, `airtable?msg=success`);
};

