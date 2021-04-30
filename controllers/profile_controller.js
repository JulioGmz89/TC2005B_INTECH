const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
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

	if (nombre.length != 0) {
		await profile.updateUsuario(nombre, email_usuario);
		response.status(200);
		request.flash('success', 'Datos guardados satisfactoriamente.');
		response.redirect('/profile');
	} else {
		response.status(400);
		request.flash('errorCampos', 'Faltan campos por llenar.');
		response.redirect('/profile');
	}

};

exports.postPassword = async (request, response, next) => {
	const email_usuario = request.session.usuario;
	const usuario = await profile.fetchUsuario(email_usuario);

	if (request.body.currPass.length != 0 && request.body.newPass.length != 0) {
		let doMatch = await bcrypt.compare(request.body.currPass, usuario[0][0].password_usuario);
		if (doMatch) {
			let passwordEncriptado = await bcrypt.hash(request.body.newPass, 12);
			request.flash('success', 'Datos guardados satisfactoriamente.');
			await profile.updateUserPassword(email_usuario, passwordEncriptado);
		} else {
			request.flash('errorCampos', 'La contraseña actual no coincide.');
		}
		response.redirect('/profile');
	} else {
		request.flash('errorCampos', 'Faltan campos por llenar.');
		response.redirect('/profile');
	}
};
