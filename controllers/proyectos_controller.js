//const Proyectos = require('../models/Proyectos');
const express = require('express');
const router = express.Router();

exports.getProyectos = (request, response, next) => {
    response.render('Proyectos', {
        title: 'Proyectos',
        //isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

// Variables que tenemos que enviar en el render:
// Nombre proyecto
// Fecha entrega
// Integrantes
// Tareas completadas
// Tiempo estimado

/**
 * const id = request.params.perro_id;
    Perro.fetchOne(id)
        .then(([rows, fieldData]) => {
            response.render('perroIndividual', {
                perros: rows,
                titulo: 'Perro',
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
 */

