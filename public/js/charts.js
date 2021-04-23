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


	async fetchFromAirtable(){
		// PARSE, CLEAN AND REORDER AIRTABLE DATA --------------------------------------------------------
		const airtableData = sessionStorage.getItem(`airtable-data-${this.id_proyecto}`);
		if (airtableData == null || airtableData == undefined){
			await fetchAirtableData(this.id_proyecto);
		}
		this.airtableData = JSON.parse(airtableData);
	}


	async estimacionesLineChartData(){
		if (Object.keys(this.airtableData).length == 0){
			await this.fetchFromAirtable();
		}
		// Filtrar por status
		this.airtableData = this.airtableData.filter(row => this.normalizeString(row.Status) == 'DONE');

		// Ordenar por finished date
		for (let i = 0; i < this.airtableData.length; i++) {
			if (!('FinishedDate' in this.airtableData[i])){
				continue;
			}
			const finishDateArr = this.airtableData[i].FinishedDate.split('-');
			const startDateArr = this.airtableData[i].StartDate.split('-');
			this.airtableData[i].FinishedDate = new Date(parseInt(finishDateArr[0]),parseInt(finishDateArr[1]),parseInt(finishDateArr[2]));
			this.airtableData[i].StartDate = new Date(parseInt(startDateArr[0]),parseInt(startDateArr[1]),parseInt(startDateArr[2]));
		}
		const sortedDates = this.airtableData.sort((a, b) => b.FinishedDate < a.FinishedDate ? 1: -1);

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


	normalizeString(string){
		string = string.toUpperCase();
		return string.replace(' ', '');
	}
}
