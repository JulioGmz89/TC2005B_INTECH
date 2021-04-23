/**
 * @brief Context manager se dedica a enviar todos los datos necesarios 
 * 		  para el manejo de la side bar (proyectos), a demás de los datos para la 
 * 		  autenticación
 * 
 * @param {*} allProjects -> Nos muestra todos los proyectos de un usuario
 * @param {*} title -> titulo de la paginación
 * @param {*} emailUsuario -> id que diferencia a los usuarios
 * @param {*} error -> error al iniciar session
 * @param {*} isLoggedIn -> Nos indica si el usuario esta autenticado
 * @param {*} csrfToken -> Clave unica por usuario
 * 
 * @return Todos los datos que se agreguen a context;
 */

const models = require('../models/proyectos');
const statusModifier = require('./status_project');


module.exports = async (title = '', request, response) => {
	let context = {}
	let error = request.session.error;
	let errorCampos = request.flash('errorCampos');
	let success = request.flash('success');

	let isLoggedIn = request.session.isLoggedIn === true ? true : false;
	let csrfToken = request.csrfToken();
	const email_user = request.session.usuario;
	let proyectos = await models.fetchProyectosUsuario(email_user);
	const usuario = await models.fetchUsuario(email_user);
	if (proyectos != undefined) {
		context['allProjects'] = proyectos[0];
	} else {
		context['allProjects'] = [];
	}
	for (let i = 0; i < context['allProjects'].length; i++) {

		let tareasTotales = await models.fetchStatusTareasProyecto(context['allProjects'][i].id_proyecto);
		tareasTotales = tareasTotales[0];
		let sum = 0;
		tareasTotales.forEach(tarea => {
			let status = statusModifier(tarea['estado_tarea']);
			sum += status;
		});

		context['allProjects'][i]['estatus_proyecto'] = sum;
	}
	context['title'] = title;
	context['email_user'] = email_user;
	context['error'] = error;
	context['errorCampos'] = errorCampos;
	context['success'] = success;
	context['isLoggedIn'] = isLoggedIn;
	context['csrfToken'] = csrfToken;
	context['usuario'] = usuario[0][0];

	return context
};

