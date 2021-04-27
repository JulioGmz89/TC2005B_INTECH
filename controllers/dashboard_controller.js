const express = require('express');
const contextInit = require('../utils/context_manager');
const models = require('../models/proyectos');
const router = express.Router();


exports.getDashboard = async (request, response, next) => {
	let context = await contextInit('Dashboard', request);

	const proyectos = context['allProjects'];
	// Pie chart
	let totalTareasCompletadasList = [];
	let totalTareasTotalList = [];
	for (let i = 0; i < proyectos.length; i++) {
		let proyecto = proyectos[i];
		let tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
		let tareasTotales = await models.fetchNumTareasProyecto(proyecto.id_proyecto);
		tareasCompl = (tareasCompl[0][0]['tareas_completadas'] == null) ? 0 : tareasCompl[0][0]['tareas_completadas'];
		tareasTotales = (tareasTotales[0][0]['todas_tareas'] == null) ? 0 : tareasTotales[0][0]['todas_tareas'];
		totalTareasCompletadasList.push(tareasCompl);
		totalTareasTotalList.push(tareasTotales);
	}

	let totalTareasCompletadas = 0;
	let totalTareasTotal = 0;

	if (totalTareasCompletadasList.length > 0) {
		totalTareasCompletadas = totalTareasCompletadasList.reduce((accumulator, currentValue) => accumulator + currentValue);
	}

	if (totalTareasTotalList.length > 0) {
		totalTareasTotal = totalTareasTotalList.reduce((accumulator, currentValue) => accumulator + currentValue);
	}

	console.log(totalTareasTotal, totalTareasCompletadas);
	const tareasAsignadas = totalTareasTotal - totalTareasCompletadas;

	// Bar chart
	const labels = [];
	const values = [];
	for (let i = 0; i < context['allProjects'].length && i<5; i++) {
		const project = context['allProjects'][i];
		labels.push(project.nombre_proyecto);
		let value = totalTareasCompletadasList[i] * 100 / totalTareasTotalList[i];
		if (value == NaN){
			value = 0;
		}
		values.push(value.toFixed(2));
	}

	// Build data response
	context['pieChart'] = JSON.stringify([totalTareasCompletadas, totalTareasTotal-totalTareasCompletadas]);
	context['barChart'] = JSON.stringify([labels, values]);

	console.log(typeof(context['pieChart']), typeof(context['barChart']));

	
	response.render('Dashboard', context);
};
