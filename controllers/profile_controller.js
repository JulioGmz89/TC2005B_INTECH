const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();

const profile = require('../models/profile');



exports.getProfile = async (request, response, next) => {
	let context = await contextInit('Perfil', request);
	const email_usuario = request.session.usuario;

	
	const usuario = await profile.fetchUsuario(email_usuario);
	context.usuario = usuario[0][0];
	
	const proyectos = await profile.fetchProyectos(email_usuario);
	context.proyectosAsignados = proyectos[0][0]['count(UP.id_proyecto)'];
	
	const proyectosNatgas = await profile.fetchTodosProyectos(email_usuario);
	context.proyectosNatgas = proyectosNatgas[0][0]['count(P.id_proyecto)'];
	
	response.render('profile', context);
};

exports.postData = async (request, response, next) => {

	const email_usuario = request.session.usuario;
	const nombre = request.body.username;
	await profile.updateUsuario(nombre, email_usuario);

	response.redirect('/profile');
};

exports.postPassword = async (request, response, next) => {

	const email_usuario = request.session.usuario;
	const password1 = request.body.password1;
	const password2 = request.body.password2;

	if(password1 == password2) {
		await profile.updatePassword(password1, email_usuario);
	}

	response.redirect('/profile');
};
