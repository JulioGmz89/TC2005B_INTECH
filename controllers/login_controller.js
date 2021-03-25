const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();

//const Login = require('../models/login');

exports.getLogin = async(request, response, next) => {
	let context = await contextInit('Login');
	response.render('Login', context);
};

exports.postLogin = (request, response, next) => {
	request.session.isLoggedIn = true;
	request.session.usuario = request.body.usuario;
	response.redirect('/');
};

exports.getLogout = (request, response, next) => {
	request.session.destroy((err) => {
		console.log(err);
		response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
	});
};