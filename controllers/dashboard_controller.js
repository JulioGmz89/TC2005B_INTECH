const express = require('express');
const contextInit = require('../utils/context_manager');
const models = require('../models/proyectos');
const router = express.Router();


exports.getDashboard = async (request, response, next) => {
	let context = await contextInit('Dashboard', request);
	
	const proyectos = context['allProjects'];
	// Pie chart
	let totalTareasCompletadas = [];
	let totalTareasTotal = [];
    for (let i=0; i<proyectos.length; i++){
		let proyecto = proyectos[i];
        let tareasCompl = await models.fetchTareasCompletadasProyecto(proyecto.id_proyecto);
		let tareasTotales = await models.fetchNumTareasProyecto(proyecto.id_proyecto);
		tareasCompl = (tareasCompl[0][0]['tareas_completadas'] == null) ? 0 : tareasCompl[0][0]['tareas_completadas'];
	    tareasTotales = (tareasTotales[0][0]['todas_tareas'] == null) ? 0 : tareasTotales[0][0]['todas_tareas'];
        totalTareasCompletadas.push(tareasCompl);
        totalTareasTotal.push(tareasTotales);
    }
	let totalTareasEstatus = totalTareasTotal;
	console.log(totalTareasCompletadas);

	if (totalTareasCompletadas.length > 0) {		
		totalTareasCompletadas = totalTareasCompletadas.reduce((accumulator, currentValue) => accumulator + currentValue);
	} else {
		totalTareasCompletadas = 0;
	}
	
	if (totalTareasTotal.length > 0) {		
		totalTareasTotal = totalTareasTotal.reduce((accumulator, currentValue) => accumulator + currentValue);
	} else {
		totalTareasTotal = 0;
	}

	const tareasAsignadas = totalTareasTotal - totalTareasCompletadas;
	context['donut_table'] = {
		"type":"doughnut",
		"data":
			{
				"labels": ["Tareas Asignadas","Tareas Completadas"],
				"datasets": [
					{
						"label":"",
						"backgroundColor":["#4e73df","#1cc88a"],
						"borderColor":["#ffffff","#ffffff"],
						"data": [tareasAsignadas.toString(), totalTareasCompletadas.toString()]
					}
				]
			},
		"options":
			{
				"maintainAspectRatio": false,
				"legend":
				{
					"display": false
				},
				"title": {}
			}
	}
	context['donut_table'] = JSON.stringify(context['donut_table']);
	context['donut_table'] = context['donut_table'].split('"').join('&quot;');
	// Bar chart
	const labels = [];
	const values = [];
	let lengthArreglo = 0;
	if (context['allProjects'].length > 0) {	
		lengthArreglo = context['allProjects'].length;
	}
	for (let i = 0; i < lengthArreglo && i < 5; i++) {
		const project = context['allProjects'][i];
		labels.push(project.nombre_proyecto);
		let value = (project.estatus_proyecto / totalTareasEstatus[i]) * 100;
		values.push(value.toString());	
		console.log(project.estatus_proyecto, totalTareasEstatus[i]);
	}
	context['bar_table'] = {
		"type":"bar",
		"data":
		{
			"labels": labels,
			"datasets":[
				{
					"label":"% Avance",
					"backgroundColor":"#4e73df",
					"borderColor":"#4e73df",
					"data": values
				}
			]
		},
		"options":
		{
			"maintainAspectRatio":false,
			"legend":{"display":false},
			"title":{},
			"scales":
			{
				"xAxes":[
					{
						"gridLines":
						{
							"color":"rgb(234, 236, 244)",
							"zeroLineColor":"rgb(234, 236, 244)",
							"drawBorder":false,
							"drawTicks":false,
							"borderDash":["2"],
							"zeroLineBorderDash":["2"],
							"drawOnChartArea":false
						},
						"ticks":
						{
							"fontColor":"#858796",
							"beginAtZero":true,
							"padding":20
						}
					}
				],
				"yAxes":[
					{
						"gridLines":
						{
							"color":"rgb(234, 236, 244)",
							"zeroLineColor":"rgb(234, 236, 244)",
							"drawBorder":false,
							"drawTicks":false,
							"borderDash":["2"],
							"zeroLineBorderDash":["2"]
						},
						"ticks":
						{
							"fontColor":"#858796",
							"beginAtZero":true,
							"padding":20
						}
					}
				]
			}
		}
	};
	context['bar_table'] = JSON.stringify(context['bar_table']);
	context['bar_table'] = context['bar_table'].split('"').join('&quot;');

	response.render('Dashboard', context);
};
