const express = require('express');
const router = express.Router();

exports.getDashboard = (request, response, next) => {
	response.render('Dashboard', {
		title: 'Dashboard',
		//isLoggedIn: request.session.isLoggedIn === true ? true : false
	});
};