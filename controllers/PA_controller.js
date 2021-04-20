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
		if (tareaCategoria[i] == undefined) {
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


	if (nombreTarea.length == 0 || nombreFase == undefined) {
		request.flash('errorCampos', 'Faltan campos por llenar');
		response.redirect('/proyecto/' + id_proyecto + '/puntos-agiles');
	}
	else {
		const id_categoria = await models.fetchIdCategoria(nombreFase);
		const registroTarea = await models.saveTarea(id_proyecto, nombreTarea, id_categoria[0][0]['id_categoria']);
		const id_tarea = registroTarea[0]['insertId'];

		let emails_usuarios = await models.fetchIntegrantesProyecto(id_proyecto);
		emails_usuarios = emails_usuarios[0];
		for (let h = 0; h < emails_usuarios.length; h++) {
			let minPa = [0, 0, 0, 0, 0, 0];
			let maxPa = [0, 0, 0, 0, 0, 0];
			let complejidad = [1, 2, 3, 5, 8, 13];
			for (let i = 0; i < 6; i++) {
				let registro = await models.saveValorPA(minPa[i], maxPa[i], complejidad[i]);
				id_complejidad = registro[0]['insertId'];
				let registro2 = await models.saveTareaComplejidad(id_tarea, id_complejidad, emails_usuarios[h].email_usuario);
				id_tareaComplejidad = registro2[0]['insertId'];
				await models.savePuntosAgiles(id_proyecto, emails_usuarios[h].email_usuario, id_tareaComplejidad);
			}
		}
		request.flash('success', 'Datos guardados satisfactoriamente');

		response.redirect("/proyecto/" + id_proyecto + "/puntos-agiles");

	}
};


exports.postNuevaFase = async (request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	const nombreFase = request.body.nombreFase;

	if (nombreFase.length == 0) {
		request.flash('errorCampos', 'Faltan campos por llenar');
		response.redirect('/proyecto/' + id_proyecto + '/puntos-agiles');
	}
	else {
		const registro = await models.saveCategoria(nombreFase);
		const id_categoria = registro[0]['insertId'];
		request.flash('success', 'Datos guardados satisfactoriamente');

		response.redirect('/proyecto/' + id_proyecto + '/puntos-agiles');
	}
};


exports.postValorPA = async (request, response, next) => {
	let id_proyecto = request.params.id_proyecto;

	let minPa = [];
	let maxPa = [];
	let complejidad = [];
	let tareas = [];
	let registro;
	let idsComplejidad = [];

	for (let key in request.body) {
		if (key.includes('idComplejidad')) {
			idsComplejidad.push(request.body[key]);
		}
		if (key.includes('min_' || 'max_')) {
			complejidad.push(key.split("_")[1]);
			tareas.push(parseInt(key.split("_")[2]));
		}
		if (key.includes('min_')) {
			minPa.push(parseInt(request.body[key]));
		}
		if (key.includes('max_')) {
			maxPa.push(parseInt(request.body[key]));
		}
	}

	for (let i = 0; i < minPa.length; i++) {
		if (idsComplejidad[i] != undefined && idsComplejidad[i] != "") {
			registro = await models.updateComplejidad(idsComplejidad[i], minPa[i], maxPa[i]);
		}
	}
	response.redirect('/proyecto/' + id_proyecto + '/puntos-agiles');
};


exports.getValorPA = async (request, response, next) => {
	const email_usuario = request.params.email_usuario;
	let id_proyecto = request.params.id_proyecto;
	// Get ids de tareas
	let tareasQuery = await models.fetchTareaProyecto(id_proyecto);
	let tareas = tareasQuery[0];
	// Get Min max nivel
	let complejidades = [];
	for (let i = 0; i < tareas.length; i++) {
		let complejidadesQuery = await models.fetchComplejidadesTarea(tareas[i].id_tarea);
		let tempComp = complejidadesQuery[0];
		for (let j = 0; j < tempComp.length; j++) {
			if (tempComp[j].email_usuario == email_usuario) {
				complejidades.push(tempComp[j]);
			}
		}
	}
	response.status(200).json(complejidades);
};