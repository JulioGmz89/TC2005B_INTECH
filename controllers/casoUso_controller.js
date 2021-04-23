const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const path = require('path');
const models = require('../models/proyectos');
const { response } = require('express');
router.use(express.static(path.join(__dirname, 'public')));




// CASOS DE USO
exports.getCasoUso = async (request, response, next) => {

	let context = await contextInit('Casos de Uso', request);
	let proyecto = await models.fetchProyecto(request.params.id_proyecto);
	proyecto = proyecto[0][0];
	const integrantes = await models.fetchIntegrantesProyecto(proyecto.id_proyecto);
	const proyectoData = await models.fetchProyecto(request.params.id_proyecto);
	let casosUso = await models.fetchCasosDeUsoProyecto(request.params.id_proyecto);
	let categoriasTareas = await models.fetchCategoriasTareaCU(request.params.id_proyecto);
	let tarea = await models.fetchTareaCU(request.params.id_proyecto);
	const iteracion = await models.fetchMaxIteracion(request.params.id_proyecto);
	let complejidades = await models.fetchComplejidadesProyecto(request.params.id_proyecto);
	let tcu = {};
	for (let i = 0; i < casosUso[0].length; i++) {
		let ids = {};
		const tareasIds = await models.fetchTareasCasoUso(casosUso[0][i].id_casoUso);
		for (let j = 0; j < tareasIds[0].length; j++) {
			ids[tareasIds[0][j].id_tarea] = tareasIds[0][j].id_tarea;
		}
		tcu[casosUso[0][i].id_casoUso] = ids;
	}

	context.proyecto = proyectoData[0][0];
	context.casosUso = casosUso[0];
	context.tareas = tarea[0];
	context.usuario = integrantes[0];
	context.tcu = tcu;
	context.iteracion = iteracion[0][0]['iteracion'];
	context.categorias = categoriasTareas[0];
	context.complejidades = complejidades[0];

	response.render('CasosUso', context);
};


exports.postNuevoCaso = async (request, response, next) => {

	const nombreCaso = request.body.nombreCaso;
	const iteracion = request.body.iteracion;
	const complejidad = request.body.complejidad;
	const id_proyecto = request.params.id_proyecto;

	if (nombreCaso.length == 0 || iteracion == null) {
		request.flash('errorCampos', 'Faltan campos por llenar');
		response.redirect(request.get('referer'));
	}
	else {
		const registro = await models.saveCasoUso(id_proyecto, nombreCaso, iteracion, complejidad);

		const id_casoUso = registro[0]['insertId'];
		request.flash('success', 'Datos guardados satisfactoriamente');
		response.redirect(request.get('referer'));
	}

};


exports.postGuardarTareas = async (request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	const tareas = [];
	let idCasoUso;

	for (let key in request.body) {
		if (key.includes('idTarea_')) {
			idCasoUso = parseInt(key.split('_')[1]);
			tareas.push(parseInt(key.split('_')[2]));
		}
	}

	for (let i = 0; i < tareas.length; i++) {
		await models.saveTareaCasoUso(tareas[i], idCasoUso);
	}

	response.redirect('/proyecto/' + id_proyecto + '/casos-uso')
}