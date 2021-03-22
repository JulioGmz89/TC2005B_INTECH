const express = require('express');
const router = express.Router();

exports.getAirtable = (request, response, next) => {
    response.render('Airtable', {
        title: 'Airtable',
        //isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};