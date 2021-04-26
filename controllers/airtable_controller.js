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
	console.log('airtable controller\n', request.body);
	if(request.body.mode == "update"){
		let requests = [];
		let tempList = [];
		request.body.fields.forEach((register, i) => {
			tempList.push(register);
			if ((tempList.length == 10) || (i == request.body.fields.length-1)){
				requests.push(tempList);
				tempList = [];
			}
		});
		for (let i = 0; i < requests.length; i++) {
			await updateAirtable.updateAirtable(requests[i]);
			setTimeout(() => {}, 220);
		}
		response.status(200).json({'body':request.body, 'params': request.params});
	}
	else if(request.body.mode == "create"){
		let requests = [];
		let tempList = [];
		request.body.fields.forEach((register, i) => {
			tempList.push(register);
			if ((tempList.length == 10) || (i == request.body.fields.length-1)){
				requests.push(tempList);
				tempList = [];
			}
		});
		for (let i = 0; i < requests.length; i++) {
			await updateAirtable.createAirtable(requests[i]);
			setTimeout(() => {}, 220);
		}
		response.status(200).json({'body':request.body, 'params': request.params});
	}
	else{
		response.status(400).json("Error: No se ha encontrado ningún modo");
	}
};


exports.postUpdateDB = async (request, response, next) => {
	const rows = request.body.data;
	for (let i = 0; i < rows.length; i++) {
		const res = await models.editTareasCasosUsoFromAirtable(rows[i].id_tareaCasoUso, rows[i].id_tarea, rows[i].estado_tareaCasoUso, rows[i].tiempo_tarea);
	}
	response.status(200).json('response');
};
