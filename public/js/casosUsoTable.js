async function fillCasosUsoTableWithAirtable(id_proyecto) {
	// Get data from airtable sessionStorage
	let airtableData = await getAirtableData(id_proyecto);
	let proyectoData = localStorage.getItem(``)

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
			if (!inicialesVistas[airtableData[i].IdCasoUso].includes(iniciales) && integranteList != null){
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
		if (fecha == undefined){
			continue;
		}
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
		if (fechasTd != null){
			fechasTd.appendChild(span);
		}
	});


	// Duration
	let duracionVistas = {};
	for (let i = 0; i < airtableData.length; i++) {
		let duration = airtableData[i]['Duration'];
		if (duration == undefined){
			duration = 0;
		}
		if (!(airtableData[i].IdCasoUso in duracionVistas)){
			duracionVistas[airtableData[i].IdCasoUso] = 0;
		}
		duracionVistas[ airtableData[i].IdCasoUso] += duration;

	}
	keys = Object.keys(duracionVistas);
	keys.forEach( key => {
		const durationsTd = document.getElementById(`durations_${key}`);
		if (durationsTd != null){
			const span = document.createElement('span');
			span.innerHTML =`${(duracionVistas[key] / 3600).toFixed(2)} hrs`;
			durationsTd.appendChild(span);
		}
	});


	// Progress bar
	let progressVistas = {};
	for (let i = 0; i < airtableData.length; i++) {
		const element = airtableData[i];
		let status = airtableData[i]['Status']
		if (status == undefined){
			status = "TODO"
		}
		status = status.toUpperCase();
		status = status.replace(" ", "");
		if (!(airtableData[i].IdCasoUso in progressVistas)){
			progressVistas[airtableData[i].IdCasoUso] = {};
			progressVistas[airtableData[i].IdCasoUso]['totalTareas'] = 0;
			progressVistas[airtableData[i].IdCasoUso]['completedTareas'] = 0;
			progressVistas[airtableData[i].IdCasoUso]['progressSum'] = 0;
		}

		if (status == "WORKING"){
			progressVistas[airtableData[i].IdCasoUso]['totalTareas'] += 1;
			progressVistas[airtableData[i].IdCasoUso]['progressSum'] += 0.25;
		}
		else if (status == "TODO" || status == "WAITING"){
			progressVistas[airtableData[i].IdCasoUso]['totalTareas'] += 1;
		}
		else if (status == "DONE"){
			progressVistas[airtableData[i].IdCasoUso]['totalTareas'] += 1;
			progressVistas[airtableData[i].IdCasoUso]['completedTareas'] += 1;
			progressVistas[airtableData[i].IdCasoUso]['progressSum'] += 1;
		}
		else if (status == "UNDERREVISION" || status == "REVISION" || status == "WAITINGFORVALIDATION"){
			progressVistas[airtableData[i].IdCasoUso]['totalTareas'] += 1;
			progressVistas[airtableData[i].IdCasoUso]['progressSum'] += 0.5;
		}

		progressVistas[airtableData[i].IdCasoUso]['progress'] = progressVistas[airtableData[i].IdCasoUso]['progressSum'] * 100 / progressVistas[airtableData[i].IdCasoUso]['totalTareas'];
	}
	keys = Object.keys(progressVistas);
	keys.forEach( key => {
		const progressDiv = document.getElementById(`progress_${key}`);
		if (progressDiv != null){
			progressDiv.innerHTML = `${Math.round(progressVistas[key]['progress'])}%`;
			progressDiv.setAttribute('style', `width: ${progressVistas[key]['progress']}%; background-color:#444`);
		}
	});
}
