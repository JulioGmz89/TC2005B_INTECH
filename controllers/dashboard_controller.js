const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();

exports.getDashboard = async (request, response, next) => {
	let error = request.session.error;
    let isLoggedIn = request.session.isLoggedIn === true ? true : false;
	let csrfToken = request.csrfToken();
	let context = await contextInit('Dashboard', error, isLoggedIn, csrfToken);
	response.render('Dashboard', context);
};