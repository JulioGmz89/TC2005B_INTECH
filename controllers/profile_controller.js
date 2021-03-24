const express = require('express');
const router = express.Router();

const profile = require('../models/profile');
const email_usuario = 'Daniel@hotmail.com';


exports.getProfile = async function(request, response, next){
	const proyectos = await profile.fetchProyectos(email_usuario);
	const proyectosNatgas = await profile.fetchTodosProyectos(email_usuario);
	console.log(proyectos[0][0]['count(P.id_proyecto)']);
	console.log(proyectosNatgas[0][0]['count(P.id_proyecto)']);
	response.render('profile', {
		title: 'Perfil',
		proyectosAsignados: proyectos[0][0]['count(P.id_proyecto)'],
		proyectosNatgas: proyectosNatgas[0][0]['count(P.id_proyecto)']
	});
};
