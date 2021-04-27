document.addEventListener('DOMContentLoaded', () => {
	try{
		const projectData = localStorage.getItem(`proyecto_${id_proyecto}`);
		const iteracion = projectData.iteracionActual;
		const rows = document.querySelectorAll(`.tr-casoUso-it${iteracion}`);
		rows.forEach( row => {
			row.remove();
		});
	}
	catch{}
});