async function fetchPtosAgiles(id_proyecto,  email_usuario){
	const response = await fetch(`http://localhost:3000/proyecto/${id_proyecto}/puntos-agiles/${email_usuario}/PA`);
	const data = await response.json();
	return data;
}


async function fetchPromedios(id_proyecto, emails){
	let complejidadesTarea = {};
	for (let i = 0; i < emails.length; i++) {
		const ptosAgilesUsr = await fetchPtosAgiles(id_proyecto, emails[i]);
		console.log(ptosAgilesUsr);
		for (let j = 0; j < ptosAgilesUsr.length; j++) {
			let idTarea = ptosAgilesUsr[j].id_tarea;
			let nivelComp = ptosAgilesUsr[j].nivel;
			let minimo = ptosAgilesUsr[j].minimo;
			let maximo = ptosAgilesUsr[j].maximo;
			if (!(idTarea in complejidadesTarea)){
				complejidadesTarea[idTarea] = {};
			}
			if (!(nivelComp in complejidadesTarea[idTarea])){
				complejidadesTarea[idTarea][nivelComp] = {'min':0, 'max':0, 'length':0};
			}
			complejidadesTarea[idTarea][nivelComp].min += minimo;
			complejidadesTarea[idTarea][nivelComp].max += maximo;
			complejidadesTarea[idTarea][nivelComp].length += 1;
		}
	}

	const idTareaKeys = Object.keys(complejidadesTarea);
	idTareaKeys.forEach( idTarea => {
		const nivelDict = complejidadesTarea[idTarea];
		const nivelKeys = Object.keys(nivelDict);
		nivelKeys.forEach( nivel => {
			const promedioMin = complejidadesTarea[idTarea][nivel].min / complejidadesTarea[idTarea][nivel].length;
			const promedioMax = complejidadesTarea[idTarea][nivel].max / complejidadesTarea[idTarea][nivel].length;
			document.getElementById(`p_min_${nivel}_${idTarea}`).innerHTML = promedioMin;
			document.getElementById(`p_max_${nivel}_${idTarea}`).innerHTML = promedioMax;
		});
	});

	console.log(complejidadesTarea);
}