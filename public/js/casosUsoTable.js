async function fillCasosUsoTableWithAirtable(id_proyecto) {
	// Get data from airtable sessionStorage
	let airtableData = await getAirtableData(id_proyecto);
	airtableData = JSON.parse(airtableData);

	// Integrantes
	let inicialesVistas = {};
	for (let i = 0; i < airtableData.length; i++) {
		if (!(airtableData[i].IdCasoUso in inicialesVistas)){
			inicialesVistas[airtableData[i].IdCasoUso] = [];
		}
		let integrantes = airtableData[i]['Assigned'];
		if (integrantes == undefined){
			integrantes = [];
		}
		const integrantesUl = document.getElementById(`integrantes_${airtableData[i].IdCasoUso}`);
		integrantes.forEach(integrante => {
			const integranteList = integrante['name'].split(" ");
			let iniciales = "";
			for (let j = 0; j < integranteList.length; j++) {
				iniciales += integranteList[j][0];
			}
			if (!inicialesVistas[airtableData[i].IdCasoUso].includes(iniciales)){
				const li = document.createElement('li');
				li.innerHTML = iniciales.toUpperCase();
				integrantesUl.appendChild(li);
				inicialesVistas[airtableData[i].IdCasoUso].push(iniciales);
			}
		});
	}

	// Fecha finalizacion
	let fechasVistas = {};
	for (let i = 0; i < airtableData.length; i++) {
		let fecha = airtableData[i]['FinishedDate'];
		const y = fecha.slice(0, 4);
		const m = fecha.slice(5, 7);
		const d = fecha.slice(8, 10);

		if (!(airtableData[i].IdCasoUso in fechasVistas)){
			fechasVistas[airtableData[i].IdCasoUso] = new Date(y, m, d);
		}
		fechaObj = new Date(y, m, d);
		if (fechaObj > fechasVistas[airtableData[i].IdCasoUso]){
			fechasVistas[airtableData[i].IdCasoUso] = fechaObj;
		}
	}
	let keys = Object.keys(fechasVistas);
	keys.forEach( key => {
		const fechasTd = document.getElementById(`fechas_${key}`);
		const span = document.createElement('span');
		span.innerHTML = fechasVistas[key].toISOString().substring(0, 10);
		fechasTd.appendChild(span);
	});


	// Duration
	let duracionVistas = {};
	console.log(airtableData);
	for (let i = 0; i < airtableData.length; i++) {
		let duration = airtableData[i]['Duration'];
		console.log(duration);
		if (duration == undefined){
			duration = 0;
		}
		if (!(airtableData[i].IdCasoUso in duracionVistas)){
			duracionVistas[airtableData[i].IdCasoUso] = 0;
		}
		duracionVistas[ airtableData[i].IdCasoUso] += duration;

	}
	keys = Object.keys(duracionVistas);
	console.log(duracionVistas);
	keys.forEach( key => {
		const durationsTd = document.getElementById(`durations_${key}`);
		const span = document.createElement('span');
		span.innerHTML =`${(duracionVistas[key] / 3600).toFixed(2)} hrs`;
		durationsTd.appendChild(span);
	});
}
