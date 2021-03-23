const express = require('express');
const router = express.Router();

//const profile = require('../models/Profile');

exports.getProfile = (request, response, next) => {
	response.render('Profile', {
		title: 'Perfil',
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	})
};