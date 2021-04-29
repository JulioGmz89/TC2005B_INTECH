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
		request.flash('errorCampos', 'Faltan campos por llenar.');
		response.redirect(request.get('referer'));
	}
	else {
		const registro = await models.saveCasoUso(id_proyecto, nombreCaso, iteracion, complejidad);

		const id_casoUso = registro[0]['insertId'];
		request.flash('success', 'Datos guardados satisfactoriamente.');
		response.redirect(request.get('referer'));
	}
};


exports.postGuardarTareas = async (request, response, next) => {
	const id_proyecto = request.params.id_proyecto;
	let idCasoUso;
	
	let tareasNuevas = {};
	for (let key in request.body) {
		if (key.includes('idTarea_')) {
			idCasoUso = parseInt(key.split('_')[1]);
			tareasNuevas[key.split('_')[2]] = (parseInt(key.split('_')[2]));
		}
	}

	let tareasActuales = [];
	const tareasCU = await models.fetchTareasCasoUso(idCasoUso);
	for (let i = 0; i < tareasCU[0].length; i++) {
		tareasActuales.push(tareasCU[0][i].id_tarea);
	}

	const borrarTareas = [];
	const agregarTareas = [];

	for (let j = 0; j < tareasActuales.length; j++) {
		if (!(tareasActuales[j] in tareasNuevas)) {
			borrarTareas.push(tareasActuales[j]);
		} else {
			delete tareasNuevas[tareasActuales[j]];
		}
	}

	const llavestareasNuevas = Object.keys(tareasNuevas);
	for (let k = 0; k < llavestareasNuevas.length; k++) {
		agregarTareas.push(tareasNuevas[llavestareasNuevas[k]]);
	}
	console.log(borrarTareas);
	console.log(agregarTareas);

	borrarTareas.forEach(tarea => {
		console.log("Borrar", idCasoUso, tarea);
		models.deleteTareaCasoUso(idCasoUso, tarea).catch(error => console.log(error));
	});

	agregarTareas.forEach(tarea => {
		console.log("Agregar", idCasoUso, tarea);
		models.saveTareaCasoUso(tarea, idCasoUso).catch(error => console.log(error));
	});

	response.redirect('/proyecto/' + id_proyecto + '/casos-uso')
}

exports.updateCaso = async (request, response, next) => {

	let id_casoUso, nombre_caso, iteracion, complejidad;
	let keys = Object.keys(request.body);
	keys.forEach(key => {
		if (key.includes("update_id_casoUso")) {
			id_casoUso = request.body[key];
			console.log(id_casoUso);
		}
		if (key.includes("updateNombreCaso")) {
			nombre_caso = request.body[key];
		}
		if (key.includes("updateIteracion")) {
			iteracion = request.body[key];
		}
		if (key.includes("updateComplejidad")) {
			complejidad = request.body[key];
		}
	});

	if (nombre_caso.length == 0 || iteracion == null) {
		request.flash('errorCampos', 'Faltan campos por llenar.');
		response.redirect('/proyecto/' + request.params.id_proyecto + '/casos-uso');
	} else {
		await models.updateCU(id_casoUso, nombre_caso, iteracion, complejidad);
		request.flash('success', 'Datos actualizados satisfactoriamente.');
		response.redirect('/proyecto/' + request.params.id_proyecto + '/casos-uso');
	}


}

exports.deleteCaso = async (request, response, next) => {
	console.log("Entro al controller");
	const data = request.body.id_casoUso;
	console.log(request.body.id_casoUso);
	await models.deleteCU(data);
	request.flash('success', 'Datos actualizados satisfactoriamente.');
	response.status(200).json("SUCCESS");
}
