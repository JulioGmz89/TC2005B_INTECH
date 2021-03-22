const express = require('express');
const router = express.Router();
const path = require('path');
router.use(express.static(path.join(__dirname, 'public')));

exports.getProyectoX = (request, response, next) => {
    response.render('Proyecto1', {
        title: 'Puntos Agiles',
        //isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

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