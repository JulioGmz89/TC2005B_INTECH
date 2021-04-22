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
		const airtableData = sessionStorage.getItem(`airtable-data-${this.id_proyecto}`);
		if (airtableData == null || airtableData == undefined){
			await fetchAirtableData(this.id_proyecto);
		}
		console.log(airtableData);
		this.airtableData = JSON.parse(airtableData);
		console.log(this.airtableData);

		// Filter by status
		this.airtableData = this.airtableData.filter(row => this.normalizeString(row.Status) == 'DONE');
		// Sort by finish date
		for (let i = 0; i < this.airtableData.length; i++) {
			this.airtableData[i].FinishedDate = new Date(this.airtableData[i].FinishedDate);
			this.airtableData[i].StartDate = new Date(this.airtableData[i].StartDate);
		}
		const sortedDates = this.airtableData.sort((a, b) => b.FinishedDate < a.FinishedDate ? 1: -1);
		// Hacer la lista de fechas
		let datesList = [];
		let currentDate = sortedDates[0].FinishedDate;
		let finishDate = sortedDates[Object.keys(sortedDates).length-1].FinishedDate;
		// console.log(currentDate);
		// console.log(finishDate);
		while(currentDate < finishDate){
			datesList.push(currentDate);
			currentDate = addDays(currentDate, 1);
		}
		// console.log(datesList);

		// Hacer diccionario key = finishDate, value = []
		let datesData = {};
		for (let i = 0; i < sortedDates.length; i++) {
			
			sortedDates[i].FinishedDate = sortedDates[i].FinishedDate.toDateString();
			if (!(sortedDates[i].FinishedDate in datesData)){
				datesData[sortedDates[i].FinishedDate] = []; 
			}
			datesData[sortedDates[i].FinishedDate].push(sortedDates[i]);
		}

		let datesValorPlaneado = {};
		// GENERATE VALOR PLANEADO
		// .... Suma de todas estimaciones
		let sumEstimaciones = 0;
		for (let i = 0; i < this.airtableData.length; i++) {
			sumEstimaciones += this.airtableData[i].Estimacion;
		}

		// .... Sacar cantidad de días entre la fecha inicial y la fecha final

		// .... Hacer arreglo de suma acumulativa del promedio de estimacion por día

		// GENERATE COSTO REAL
		// .... Generar un diccionario con las fechas y la duracion
		// .... Ordenar en un diccionario por finished Date y como valor que sea {duracion, integrantes.length}
		
		// GENERATE VALOR GANADO
		// .... Generar un diccionario con las fechas y la estimacion
	}

	placeEstimacionesLineChart(){

	}

	normalizeString(string){
		string = string.toUpperCase();
		return string.replace(' ', '');
	}
}

// const estimacionesLineChart = {
// 	labels: [
// 		'January',
// 		'February',
// 		'March',
// 		'April',
// 		'May',
// 		'June',
// 	],
	
// 	data: {
// 		labels: labels,
// 		datasets: [{
// 			label: 'My First dataset',
// 			backgroundColor: 'rgb(255, 99, 132)',
// 			borderColor: 'rgb(255, 99, 132)',
// 			data: [0, 10, 5, 2, 20, 30, 45],
// 			fill: false,
// 			tension: 0.2
// 		}]
// 	},

// 	config: {
// 			type: 'line',
// 			data,
// 			options: {
// 				color: '#eee',
// 				scales: {
// 					yAxes: {
// 						ticks: {
// 							color: '#eee'
// 						}
// 					},
// 					xAxes: {
// 						ticks: {
// 							color: '#eee'
// 						}
// 					}
// 				}
// 			}
// 		}
// };