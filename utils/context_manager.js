const models = require('../models/proyectos');


module.exports = async (title='', error, isLoggedIn, csrfToken) => {
	const email_usuario = 'Daniel@hotmail.com';
    const proyectos = await models.fetchProyectosUsuario(email_usuario);
	let context = {}
	context['title'] = title;
	context['allProjects'] = proyectos[0];
	context['error'] = error;
	context['isLoggedIn'] = isLoggedIn;
	context['csrfToken'] = csrfToken;

	return context
};
