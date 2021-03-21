//const Proyectos = require('../models/Proyectos');
const express = require('express');
const router = express.Router();

exports.getProyectos = (request, response, next) => {
    response.render('Proyectos', {
        titulo: 'Proyectos',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

// Variables que tenemos que enviar en el render:
// Nombre proyecto
// Fecha entrega
// Integrantes
// Tareas completadas
// Tiempo estimado
