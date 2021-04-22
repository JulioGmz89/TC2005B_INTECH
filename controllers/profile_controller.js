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
	console.log(proyectos[0][0]['count(UP.id_proyecto)']);
	context.proyectosAsignados = proyectos[0][0]['count(UP.id_proyecto)'];
	
	const proyectosNatgas = await profile.fetchTodosProyectos(email_usuario);
	console.log(proyectosNatgas[0][0]['count(P.id_proyecto)']);
	context.proyectosNatgas = proyectosNatgas[0][0]['count(P.id_proyecto)'];
	
	response.render('profile', context);
};

exports.postData = async (request, response, next) => {


};

exports.postPassword = async (request, response, next) => {
	const email_usuario = request.session.usuario;
	const usuario = await profile.fetchUsuario(email_usuario);

	bcrypt.compare(request.body.currPass, usuario[0][0].password_usuario)
		.then(doMatch => {
			if (doMatch) {
				return bcrypt.hash(request.body.newPass, 12)
					.then((passwordEncriptado) => {
						return profile.updateUserPassword(email_usuario, passwordEncriptado);
					}).catch(err => console.log(err));
			}
			request.session.error = "La contraseña actual no coincide";
		}).catch(err => {
			request.session.error = "La contraseña actual no coincide";
		});
	
	response.redirect('/profile');
};
