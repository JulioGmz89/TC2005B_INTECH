const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
const { response } = require('express');
router.use(express.static(path.join(__dirname, 'public')));



// PTOS AGILES
exports.getPA = async (request, response, next) => {
	let context = await contextInit('Puntos Ágiles', request);
	let id_proyecto = request.params.id_proyecto;
	let proyecto = await models.fetchProyecto(request.params.id_proyecto);
	let categoria = await models.fetchCategoriaPts();
	let tareas = await models.fetchTareaProyecto(id_proyecto);
	let tareaCategoria = [];
	let fase = [];
	let complejidad = [1, 2, 3, 5, 8, 13];
	let sum = 0;
	tareas = tareas[0];
	categoria = categoria[0];

	for (let i = 0; i < categoria.length; i++) {
		tareaCategoria[i] = 0;
		for (let j = 0; j < tareas.length; j++) {
		if (tareas[j].id_categoria == categoria[i].id_categoria) {
				fase[i] = categoria[i].nombre_categoria;
				tareaCategoria[i] = await models.fetchTareasCategoria(tareas[j].id_categoria, id_proyecto);
			} 
		}
	}

	for (let i = 0; i < tareaCategoria.length; i++) {
		tareaCategoria[i] = tareaCategoria[i][0];
		if(tareaCategoria[i] == undefined){
			tareaCategoria[i] = 0;
		}
	}

	context['proyecto'] = proyecto[0][0];
	context['categoria'] = fase;
	context['fase'] = categoria;
	context['tareas'] = tareas;
	context['tareaCategoria'] = tareaCategoria;
	context['complejidad'] = complejidad;

	
	response.render('PtsAgiles', context);
};


exports.postNuevaTarea = async (request, response, next) => {

	const nombreTarea = request.body.nombreTarea;
	const id_proyecto = request.params.id_proyecto;
	const nombreFase = request.body.faseTarea;

	const id_categoria = await models.fetchIdCategoria(nombreFase);

	const registro = await models.saveTarea(id_proyecto, nombreTarea, id_categoria[0][0]['id_categoria']);

	const id_tarea = registro[0]['insertId'];

	response.redirect("/proyecto/" + id_proyecto + "/puntos-agiles");
};


exports.postNuevaFase = async (request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	const nombreFase = request.body.nombreFase;

	const registro = await models.saveCategoria(nombreFase);
	const id_categoria = registro[0]['insertId'];

	response.redirect('/proyecto/' + id_proyecto + '/puntos-agiles');
};


exports.postValorPA = async (request, response, next) => {

	const email_usuario = 'Daniel@hotmail.com'; //request.session.usuario;
	let id_proyecto = request.params.id_proyecto;

	let minPa = [];
	let maxPa = [];
	let complejidad = [];
	let tareas = [];
	let registro, registro2, id_complejidad;

	for (let key in request.body) {
		if (key.includes('min_' || 'max_')) {
			complejidad.push(key.split("_")[1]);
			tareas.push(parseInt(key.split("_")[2]));
		}
		if (key.includes('min_')) {
			console.log("min");
			minPa.push(parseInt(request.body[key]));
			console.log(minPa);
		}
		if (key.includes('max_')) {
			console.log("max");
			maxPa.push(parseInt(request.body[key]));
			console.log(maxPa);
		}
	}

	console.log(minPa, maxPa);
	for (let i = 0; i < minPa.length; i++) {
		registro = await models.saveValorPA(minPa[i], maxPa[i], complejidad[i]);
		id_complejidad = registro[0]['insertId'];
		registro2 = await models.saveTareaComplejidad(tareas[i], id_complejidad);
		id_tareaComplejidad = registro2[0]['insertId'];
		await models.savePuntosAgiles(id_proyecto, email_usuario, id_tareaComplejidad);
	}
	response.redirect('/proyecto/' + id_proyecto + '/puntos-agiles');
};