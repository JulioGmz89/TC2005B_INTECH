function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}



class Estimaciones {
	constructor(id_proyecto){
		this.id_proyecto = id_proyecto;
		this.airtableData = {};
	}

	async estimacionesLineChartData(){
		this.airtableData = await getAirtableData(this.id_proyecto);

		// Filtrar por status
		this.airtableData = this.airtableData.filter(row => this.normalizeString(row.Status) == 'DONE');

		// Ordenar por finished date
		for (let i = 0; i < this.airtableData.length; i++) {
			if (this.airtableData[i].FinishedDate == null){
				continue;
			}
			const finishDateArr = this.airtableData[i].FinishedDate.split('-');
			const startDateArr = this.airtableData[i].StartDate.split('-');
			this.airtableData[i].FinishedDate = new Date(parseInt(finishDateArr[0]),parseInt(finishDateArr[1]),parseInt(finishDateArr[2]));
			this.airtableData[i].StartDate = new Date(parseInt(startDateArr[0]),parseInt(startDateArr[1]),parseInt(startDateArr[2]));
		}
		const sortedDates = this.airtableData.sort((a, b) => b.FinishedDate < a.FinishedDate ? 1: -1);
		if (sortedDates.length == 0){return}

		// GENERATE VALOR PLANEADO --------------------------------------------------------
		// Suma de todas estimaciones
		let sumEstimaciones = 0;
		for (let i = 0; i < this.airtableData.length; i++) {
			sumEstimaciones += this.airtableData[i].Estimation;
		}
		// Sacar cantidad de días entre la fecha inicial y la fecha final
		let datesList = [];
		let currentDate = sortedDates[0].FinishedDate;
		let finishDate = sortedDates[Object.keys(sortedDates).length-1].FinishedDate;
		do {
			datesList.push(currentDate.toDateString());
			currentDate = addDays(currentDate, 1);
		} while (currentDate <= finishDate);
		// Hacer arreglo de suma acumulativa del promedio de estimacion por día
		const promedioEstimaciones = sumEstimaciones / datesList.length;
		const promediosEstimacionesArr = [];
		for (let i = 0; i < datesList.length; i++) {
			promediosEstimacionesArr.push((promedioEstimaciones * (i+1)).toFixed(2));
		}

		// GENERATE COSTO REAL --------------------------------------------------------
		// Crear un diccionario con las fechas y la duracion
		let datesDuration = {};
		for (let i = 0; i < sortedDates.length; i++) {
			const dateString = sortedDates[i].FinishedDate.toDateString();
			if (!(dateString in datesDuration)){
				datesDuration[dateString] = 0;
			}
			const integrantes = sortedDates[i].Assigned;
			if (integrantes == null){
				integrantes = [];
			}
			datesDuration[dateString] += (sortedDates[i].Duration / 3600) * integrantes.length;
		}
		// Crear lista de duraciones
		const duracionesFechas = [];
		let duracionAcumulada = 0;
		for (let i = 0; i < datesList.length; i++) {
			if (datesList[i] in datesDuration){
				duracionAcumulada += datesDuration[datesList[i]];
			}
			duracionesFechas.push(duracionAcumulada.toFixed(2));
		}
		
		// GENERATE VALOR GANADO --------------------------------------------------------
		// Crear un diccionario con las fechas y la duracion
		let datesEstimacion = {};
		for (let i = 0; i < sortedDates.length; i++) {
			const dateString = sortedDates[i].FinishedDate.toDateString();
			if (!(dateString in datesEstimacion)){
				datesEstimacion[dateString] = 0;
			}
			datesEstimacion[dateString] += sortedDates[i].Estimation;
		}
		// Crear lista de duraciones
		const estimacionesFechas = [];
		let estimacionAcumulada = 0;
		for (let i = 0; i < datesList.length; i++) {
			if (datesList[i] in datesEstimacion){
				estimacionAcumulada += datesEstimacion[datesList[i]];
			}
			estimacionesFechas.push(estimacionAcumulada.toFixed(2));
		}

		// RETURN FORMATED DATA --------------------------------------------------------
		const data = {
			labels: datesList,
			datasets: [
				{
				label: 'Valor Planeado',
				backgroundColor: '#4a86e8',
				borderColor: '#4a86e8',
				data: promediosEstimacionesArr,
				fill: false,
				tension: 0.2
				},
				{
				label: 'Costo Real',
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: duracionesFechas,
				fill: false,
				tension: 0.2
				},
				{
				label: 'Valor Ganado',
				backgroundColor: '#6aa84f',
				borderColor: '#6aa84f',
				data: estimacionesFechas,
				fill: false,
				tension: 0.2
				},
			]
		};
		const config = {
			type: 'line',
			data: data,
			options: {
				legend: {
					labels: {
						fontColor: '#eee'
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							fontColor: '#eee'
						},
						scaleLabel: {
							display: true,
							labelString: 'Tiempo de trabajo (hrs.)',
							fontColor: '#eee'
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: '#eee'
						},
					}]
				}
			}
		};
		return config;
	}


	async cargaTrabajoChartData(){
		// PARSE AIRTABLE DATA
		this.airtableData = await getAirtableData(this.id_proyecto);

		// REORDER DATA
		let integrantesData = {};
		for (let i = 0; i < this.airtableData.length; i++) {
			if (!('Assigned' in this.airtableData[i])){continue;}
			for (let j = 0; j < this.airtableData[i].Assigned.length; j++) {
				const key = this.airtableData[i].Assigned[j].name;
				if (!(key in integrantesData)){
					integrantesData[key] = 0;
				}
				if (this.normalizeString(this.airtableData[i].Status) == 'DONE'){
					integrantesData[key] += this.airtableData[i].Duration / 3600;
				}
				else if (this.normalizeString(this.airtableData[i].Status) == 'REJECTED'){
					continue;
				}
				else {
					integrantesData[key] += this.airtableData[i].Estimation;
				}
			}
		}
		const carga = [];
		const keys = Object.keys(integrantesData);
		for (let i = 0; i < keys.length; i++) {
			carga.push(integrantesData[keys[i]].toFixed(2));
		}
		const names = []
		for (let i = 0; i < keys.length; i++) {
			names.push(keys[i].split(' ')[0]); 
		}

		// GENERATE RESPONSE
		const data = {
			labels: names,
			datasets: [
				{
					data: carga, 
					borderWidth: 1, 
					backgroundColor: [
					'rgba(255, 99, 132, 0.8)',
					'rgba(255, 159, 64, 0.8)',
					'rgba(255, 205, 86, 0.8)',
					'rgba(75, 192, 192, 0.8)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(153, 102, 255, 0.8)',
					'rgba(201, 203, 207, 0.8)',
					'rgba(255, 99, 132, 0.8)',
					'rgba(255, 159, 64, 0.8)',
					'rgba(255, 205, 86, 0.8)',
					'rgba(75, 192, 192, 0.8)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(153, 102, 255, 0.8)',
					'rgba(201, 203, 207, 0.8)'
					],
				},
			]
		};
		const config = {
			type: 'bar',
			data: data,
			options: {
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							fontColor: '#eee',
						},
						scaleLabel: {
							display: true,
							labelString: 'Tiempo de trabajo (hrs.)',
							fontColor: '#eee'
						}
					}],
					xAxes: [{
						ticks: {
							fontColor: '#eee',
						},
					}],
					y: {
						beginAtZero: true
					}
				}
			}
		}
						
		return config;
	}
	

	async estimacionesPieChartData(){
		// PARSE AIRTABLE DATA
		this.airtableData = await getAirtableData(this.id_proyecto);

		// Guardar cantidad de tareas por Status	
		let status = {};
		status["Done"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'DONE').length;
		status["To do"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'TODO').length;
		status["Working"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'WORKING').length;
		status["Waiting"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'WAITING').length; 
		status["Waiting for validation"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'WAITINGFOR VALIDATION').length;  
		status["Under revision"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'UNDERREVISION').length;
		status["Rejected"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'REJECTED').length;

		const data = {
			labels: [
				'Done',
				'To do',
				'Working',
				'Waiting',
				'Waiting for validation',
				'Under revision',
				'Rejected'
				],
				datasets: [{
				label: 'My First Dataset',
				data: [status["Done"], status["To do"], status["Working"], status["Waiting"], status["Waiting for validation"], status["Under revision"], status["Rejected"]],
				backgroundColor: [
					'rgba(106, 168, 79, 0.8)',
					'rgba(74, 134, 232, 0.8)',
					'rgba(255, 205, 86, 0.8)',
					'rgba(75, 192, 192, 0.8)',
					'rgba(255, 99, 132, 0.8)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(201, 203, 207, 0.8)'
				],
				hoverOffset: 4
				}]
		};
		
		const config = {
			type: 'pie',
				data: data,
			options: {
				legend: {
					labels: {
						fontColor: '#eee'
					}
				}
			}
		};
		return config;
	}


	async progresoCasosUsoChartData(){
		// PARSE AIRTABLE DATA
		this.airtableData = await getAirtableData(this.id_proyecto);

		// REORDER DATA
		// .... Crear diccionario basado en los casos de uso
		let casosUsoData = {};
		for (let i = 0; i < this.airtableData.length; i++) {
			const idCasoUso = this.airtableData[i].IdCasoUso;
			if (this.normalizeString(this.airtableData[i].Status) == 'REJECTED'){
				continue;
			}
			if (!(idCasoUso in casosUsoData)){
				casosUsoData[idCasoUso] = {tareasCompletadas:0, tareasTotales:0, nombre:''};
			}
			if (this.normalizeString(this.airtableData[i].Status) == 'DONE'){
				casosUsoData[idCasoUso]['tareasCompletadas'] += 1;
			}
			else if (this.normalizeString(this.airtableData[i].Status) == 'WORKING'){
				casosUsoData[idCasoUso]['tareasCompletadas'] += 0.25;
			}
			let nombre = this.airtableData[i].Name.split(' - ');
			casosUsoData[idCasoUso]['tareasTotales'] += 1;
			casosUsoData[idCasoUso]['nombre'] = nombre[0] + ' - ' + nombre[1];
		}

		const keys = Object.keys(casosUsoData);
		let nombresCasosUso = [];
		let percentages = [];
		for (let i = 0; i < keys.length; i++) {
			let percentage = casosUsoData[keys[i]].tareasCompletadas / casosUsoData[keys[i]].tareasTotales * 100;
			percentages.push(percentage.toFixed(2));
			nombresCasosUso.push(casosUsoData[keys[i]].nombre);
		}
		
		// GENERATE RESPONSE
		const data = {
			labels: nombresCasosUso,
			datasets: [
				{
					data: percentages,
					borderWidth: 1, 
					backgroundColor: [
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					'#6aa84f',
					],
				},
			]
		};
		const config = {
			type: 'horizontalBar',
			data: data,
			options: {
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true,
							fontColor: '#eee'
						},
            			barPercentage: 0.8
					}],
					xAxes: [{
						ticks: {
							fontColor: '#eee',
							min: 0,
							max: 100
						},
						scaleLabel: {
							display: true,
							labelString: 'Tareas Completadas (%)',
							fontColor: '#eee'
						}
					}]
				}
			}
		}
						
		return config;
	}

	async barrasProgresoProyecto() {
		// PARSE AIRTABLE DATA
		this.airtableData = await getAirtableData(this.id_proyecto);

		// Guardar cantidad de tareas por Status	
		let barras = {};
		barras["tareasTotales"] = this.airtableData.length;
		barras["tareasTerminadas"] = this.airtableData.filter(row => this.normalizeString(row.Status) == 'DONE').length;
		barras["estimacionTotal"] = 0;
		barras["estimacionActual"] = 0;

		for (let i = 0; i < this.airtableData.length; i++) {
			barras["estimacionTotal"] += this.airtableData[i].Estimation;
			if (this.normalizeString(this.airtableData[i].Status) == 'DONE'){
				barras["estimacionActual"] += this.airtableData[i].Estimation;
			}
		}

		return barras;
	}


	normalizeString(string){
		string = string.toUpperCase();
		return string.replace(' ', '');
	}

}


function dashboardBarProjects(listLabels, listValues){
	const data = {
		labels: listLabels,
		datasets: [{
			label: 'Avance por proyecto',
			data: listValues,
			backgroundColor: [
				'#52ad47',
				'#52ad47',
				'#52ad47',
				'#52ad47',
				'#52ad47',
			],
			borderWidth: 1
		}]
	};

	const config = {
		type: 'bar',
		data: data,
		options: {
			legend: {
				labels: {
					fontColor: '#eee'
				}
			},
			scales: {
				xAxes: [{
					ticks: {
						beginAtZero: true,
						fontColor: '#eee'
					},
					barPercentage: 0.9
				}],
				yAxes: [{
					ticks: {
						fontColor: '#eee',
						min: 0,
						max: 100
					},
					scaleLabel: {
						display: true,
						labelString: 'Tareas Completadas (%)',
						fontColor: '#eee'
					}
				}]
			}
		},

	};

	return config;
}


function dashboardPieProjects(listValues){
	const data = {
		labels: ['Tareas completadas', 'Tareas pendientes'],
		datasets: [{
			label: 'Avance por proyecto',
			data: listValues,
			backgroundColor: [
				'#3b77bb',
				'#52ad47'
			],
			borderWidth: 1,
			hoverOffset: 4
		}]
	};

	const config = {
		type: 'doughnut',
		data: data,
		legend: {
			labels: {
				fontColor: '#eee'
			}
		}
	};

	return config;
}