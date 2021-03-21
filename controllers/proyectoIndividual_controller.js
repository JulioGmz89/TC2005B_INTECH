// el nombre del archivo puede cambiar no supe como llamarle

//const Proyectos = require('../models/Proyectos');
const express = require('express');
const router = express.Router();

exports.getProyecto = (request, response, next) => {
    response.render('Proyectos', {
        titulo: 'Proyectos',
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

// Variables que tenemos que enviar en el render:
// Tareas completadas
// fecha inicio
// fecha entrega
// dias restantes
// cliente
