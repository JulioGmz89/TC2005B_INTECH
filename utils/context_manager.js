const models = require('../models/proyectos');
const statusModifier = require('./status_project');


module.exports = async (title='') => {
	const email_usuario = 'Daniel@hotmail.com';
    let proyectos = await models.fetchProyectosUsuario(email_usuario);
	proyectos = proyectos[0];
	for (let i = 0; i < proyectos.length; i++) {

		let tareasTotales = await models.fetchStatusTareasProyecto(proyectos[i].id_proyecto);
		tareasTotales = tareasTotales[0];
		let sum = 0;
		tareasTotales.forEach( tarea => {
			let status = statusModifier(tarea['estado_tarea']);
			sum += status;
			console.log(tarea['estado_tarea'], status);
		});

		proyectos[i]['estatus_proyecto'] = sum;
	}

	let context = {}
	context['title'] = title;
	context['email_usuario'] = email_usuario;
	context['allProjects'] = proyectos;
	//context.isLoggedIn: request.session.isLoggedIn === true ? true : false
	return context
};
