const models = require('../models/proyectos');
const statusModifier = require('./status_project');


module.exports = async (title='', request) => {
	let context = {}
	console.log(request.session);
	console.log(request.session.error, ".");
	let error = request.session.error;
    let isLoggedIn = request.session.isLoggedIn === true ? true : false;
	let csrfToken = request.csrfToken();
	const email_usuario = request.session.usuario;
    let proyectos = await models.fetchProyectosUsuario(email_usuario);
	if (proyectos != undefined) {
		context['allProjects'] = proyectos[0];
	} else {
		context['allProjects'] = [];
	}
	for (let i = 0; i < context['allProjects'].length; i++) {

		let tareasTotales = await models.fetchStatusTareasProyecto(context['allProjects'][i].id_proyecto);
		tareasTotales = tareasTotales[0];
		let sum = 0;
		tareasTotales.forEach( tarea => {
			let status = statusModifier(tarea['estado_tarea']);
			sum += status;
		});

		context['allProjects'][i]['estatus_proyecto'] = sum;
	}
	context['title'] = title;
	context['email_usuario'] = email_usuario;
	context['error'] = error;
	context['isLoggedIn'] = isLoggedIn;
	context['csrfToken'] = csrfToken;

	return context
};
