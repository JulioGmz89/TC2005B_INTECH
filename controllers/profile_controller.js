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


};
