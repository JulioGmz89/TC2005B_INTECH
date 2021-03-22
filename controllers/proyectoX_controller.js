const express = require('express');
const router = express.Router();

exports.getPA = (request, response, next) => {
    response.render('PtsAgiles', {
        title: 'Puntos Agiles',
        //isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.getCasoUso = (request, response, next) => {
    response.render('CasosUso', {
        title: 'Casos de Uso',
        //isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};