const airtableModel = require('../models/airtable');
const express = require('express');
const router = express.Router();
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));

exports.getProyectoX = (request, response, next) => {
	response.render('Proyecto1', {
		title: 'Puntos Agiles',
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	});
};

exports.getPA = (request, response, next) => {
	response.render('PtsAgiles', {
		title: 'Puntos Agiles',
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	});
};

exports.getCasoUso = (request, response, next) => {
	response.render('CasosUso', {
		title: 'Casos de Uso',
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	});
};

exports.getAirtable = (request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	const keys = await airtableModel.fetchKeys(id_proyecto);
	const newObj = new airtableModel(id_proyecto, keys[0][0]['userKey_proyecto'], keys[0][0]['baseKey_proyecto']);
	response.render('Airtable', {
		title: 'Airtable',
		//csrfToken: request.csrfToken(),
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	});
};

exports.postAirtable = async(request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	const keys = await airtableModel.fetchKeys(id_proyecto);
	const newObj = new airtableModel(id_proyecto, keys[0][0]['userKey_proyecto'], keys[0][0]['baseKey_proyecto']);
	newObj.save();
	response.redirect('Airtable', {
		title: 'Airtable',
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	});
};