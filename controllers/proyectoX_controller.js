const airtableModel = require('../models/airtable');
const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
const Airtable = require('airtable');
const { response } = require('express');
router.use(express.static(path.join(__dirname, 'public')));


exports.getProyectoX = async (request, response, next) => {
	let context = await contextInit(`Proyecto: ${request.params.id_proyecto}`, request);
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
	//let context = await contextInit();
	//context.title = `Proyecto: ${request.params.id_proyecto}`;
	let context = await contextInit('Casos de Uso', request);
	let proyecto = await models.fetchProyecto(request.params.id_proyecto);
	proyecto = proyecto[0][0];
	const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	let casosUso = await models.fetchCasosDeUsoProyecto(request.params.id_proyecto);
	casosUso = casosUso[0];
	for (let i=0; i<casosUso.length; i++) {
		casosUso[i].integrantes = await models.fetchIntegrantesCasoUso(request.params.id_proyecto, casosUso[i].id_casoUso);
		casosUso[i].integrantes = casosUso[i].integrantes[0];
	}

	context.proyecto = proyectoData[0][0];
	context.casosUso = casosUso;
	context['usuario'] = integrantes[0];

	response.render('CasosUso', context);
};


exports.postNuevoCaso = async (request, response, next) => {

	const nombreCaso = request.body.nombreCaso;
	const iteracion = request.body.iteracion;
	const complejidad = request.body.complejidad;
	const id_proyecto = request.params.id_proyecto;
	console.log(nombreCaso, iteracion, complejidad, id_proyecto);

	const registro = await models.saveCasoUso(id_proyecto, nombreCaso, iteracion, complejidad);
	console.log(registro);
	const id_casoUso = registro[0]['insertId'];

	response.redirect(request.get('referer'));
	//response.redirect('/:id_proyecto/casos-uso');
};


exports.getAirtable = async (request, response, next) => {
	let context = await contextInit('Conexión con Airtable', request);

	const idProyecto = request.params.id_proyecto;
	let keys = await airtableModel.RegistrarKeys.fetchKeys(idProyecto);
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
	const keys = await airtableModel.RegistrarKeys.fetchKeys(idProyecto);
	const newObj = new airtableModel.RegistrarKeys(idProyecto, request.body['user-key'], request.body['base-key']);
	newObj.save();
	response.redirect(200, `airtable?msg=success`);
};


exports.getAirtableData = async (request, response, next) => {
	let context = {};

	try {
		let keys = await airtableModel.RegistrarKeys.fetchKeys(request.params.id_proyecto);
		const airtable = new airtableModel.AirtableConection(request.params.id_proyecto, keys[0][0]['userKey_proyecto'], keys[0][0]['baseKey_proyecto']);
		await airtable.fetchAll();
		context['body'] = airtable.data;
	} catch (error) {
		console.log(error);
	}
	context['status'] = 200;
	context = JSON.stringify(context);
	response.status(200).json(context);
};


exports.getTareas = async (request, response, next) => {
	const idProyecto = request.params.id_proyecto;
	let query = await airtableModel.fetchTareas(idProyecto);
	query = JSON.stringify(query[0]);
	response.status(200).json(query);
};

