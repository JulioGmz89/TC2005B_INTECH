const airtableModel = require('../models/airtable');
const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const modelsProyectos = require('../models/proyectos');
router.use(express.static(path.join(__dirname, 'public')));


exports.getProyectoX = async (request, response, next) => {
	let context = await contextInit();
	context.title = `Proyecto: ${request.params.id_proyecto}`;
	const proyectoData = await modelsProyectos.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];

	response.render('Proyecto1', context);
};


exports.getPA = async (request, response, next) => {
	let context = await contextInit('Puntos Ágiles');
	const proyectoData = await modelsProyectos.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];

	response.render('PtsAgiles', context);
};


exports.getCasoUso = async (request, response, next) => {
	let context = await contextInit('Casos de Uso');
	const proyectoData = await modelsProyectos.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];
	
	response.render('CasosUso', context);
};


exports.getAirtable = async (request, response, next) => {
	let context = await contextInit('Conexión con Airtable');

	const idProyecto = request.params.id_proyecto;
	let keys = await airtableModel.fetchKeys(idProyecto);
	const proyectoData = await modelsProyectos.fetchProyecto(request.params.id_proyecto);
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

