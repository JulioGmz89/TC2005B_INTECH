const express = require('express');
const contextInit = require('../utils/context_manager');
const router = express.Router();

exports.getDashboard = async (request, response, next) => {
	let context = await contextInit('Dashboard');
	response.render('Dashboard', context);
};