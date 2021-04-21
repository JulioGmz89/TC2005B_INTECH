const airtableModel = require('../models/airtable');
const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
const { response } = require('express');
router.use(express.static(path.join(__dirname, 'public')));


exports.getAirtable = async (request, response, next) => {
	let context = await contextInit('Conexión con Airtable', request);

	const idProyecto = request.params.id_proyecto;
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];
	try {
		let keys = await airtableModel.RegistrarKeys.fetchKeys(idProyecto);
		context.data = {
			idProyecto: idProyecto,
			userKey: keys[0][0]['userKey_proyecto'],
			baseKey: keys[0][0]['baseKey_proyecto'],
		}
	} catch (error) {
		console.log(error);
	}

	const airtable = new airtableModel.AirtableConection(idProyecto, context.data.userKey, context.data.baseKey);

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
	response.set('Content-type', 'application/json');
	response.status(200).json(context);
};


exports.getTareas = async (request, response, next) => {
	const idProyecto = request.params.id_proyecto;
	let query = await airtableModel.fetchTareas(idProyecto);
	query = JSON.stringify(query[0]);
	response.status(200).json(query);
};


exports.postUpdateAirtable = async (request, response, next) => {
	const updateAirtable = new airtableModel.AirtableConection(request.body.id_proyecto, request.body.userKey, request.body.baseKey);
	if(request.body.mode == "update"){
		await updateAirtable.updateAirtable(request.body.fields);
		response.status(200).json({'body':request.body, 'params': request.params});
	}
	else if(request.body.mode == "create"){
		await updateAirtable.createAirtable(request.body.fields);
		response.status(200).json({'body':request.body, 'params': request.params});
	}
	else{
		response.status(400).json("Error: No se ha encontrado ningún modo");
	}
};