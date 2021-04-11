const airtableModel = require('../models/airtable');
const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
const Airtable = require('airtable');
router.use(express.static(path.join(__dirname, 'public')));


exports.getProyectoX = async (request, response, next) => {
	let context = await contextInit('Proyecto ' + request.params.id_proyecto, request);
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
	console.log(request.params.id_proyecto);
	let proyecto = await models.fetchProyecto(request.params.id_proyecto);
	let categoria = await models.fetchCategoria();

	context['proyecto'] = proyecto[0][0];
	context['categoria'] = categoria[0];

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
	let tarea = await models.fetchTarea();
	casosUso = casosUso[0];
	for (let i = 0; i < casosUso.length; i++) {
		casosUso[i].integrantes = await models.fetchIntegrantesCasoUso(request.params.id_proyecto, casosUso[i].id_casoUso);
		casosUso[i].integrantes = casosUso[i].integrantes[0];
	}

	for (let i = 0; i < tarea[0].length; i++) {
		console.log(tarea[0][i].id_tarea);
	}

	context.proyecto = proyectoData[0][0];
	context.casosUso = casosUso;
	context.tareas = tarea[0];
	context['usuario'] = integrantes[0];

	response.render('CasosUso', context);
};


exports.postNuevoCaso = async (request, response, next) => {

	const nombreCaso = request.body.nombreCaso;
	const iteracion = request.body.iteracion;
	const complejidad = request.body.complejidad;
	const id_proyecto = request.params.id_proyecto;

	const registro = await models.saveCasoUso(id_proyecto, nombreCaso, iteracion, complejidad);

	const id_casoUso = registro[0]['insertId'];

	response.redirect(request.get('referer'));
	//response.redirect('/:id_proyecto/casos-uso');
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

exports.getAirtable = async (request, response, next) => {
	let context = await contextInit('Conexión con Airtable', request);

	const idProyecto = request.params.id_proyecto;
	let keys = await airtableModel.RegistrarKeys.fetchKeys(idProyecto);
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	context.proyecto = proyectoData[0][0];

	context.data = {
		idProyecto: idProyecto,
		userKey: keys[0][0]['userKey_proyecto'],
		baseKey: keys[0][0]['baseKey_proyecto'],
	}

	const airtable = new airtableModel.AirtableConection(idProyecto, context.data.userKey, context.data.baseKey);

	response.render('Airtable', context);
};


exports.postAirtable = async (request, response, next) => {
	const idProyecto = request.params.id_proyecto;
	const keys = await airtableModel.fetchKeys(idProyecto);
	const newObj = new airtableModel(idProyecto, request.body['user-key'], request.body['base-key']);
	newObj.save();
	response.redirect(200, `airtable?msg=success`);
};


exports.postGuardarTareas = async (request, response, next) => {
	const idTarea = request.params.id_tarea;
	const idCasoUso = request.params.id_caso;

	const tareas = [];

	for (let key in request.body) {
		if (key.includes('idTarea_')) {
			tareas.push(request.body[key]);
		}
	}

	console.log(tareas);
}
