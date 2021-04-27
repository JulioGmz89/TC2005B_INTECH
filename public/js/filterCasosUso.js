document.addEventListener('DOMContentLoaded', () => {
	try{
		let projectData = localStorage.getItem(`proyecto_${id_proyecto}`);
		projectData = JSON.parse(projectData);
		const iteracion = projectData.iteracionActual;
		const rows = document.querySelectorAll(`.tr-casoUso`);
		if (iteracion != 'TODOS'){
			for (let i = 0; i < rows.length; i++) {
				console.log(iteracion, typeof(iteracion), rows[i].id, !rows[i].id.includes('it'+iteracion) );
				if (!rows[i].id.includes('it'+iteracion)){
					rows[i].remove();
				}
			}
		}
	}
	catch (error){
		console.log(error);
	}
});