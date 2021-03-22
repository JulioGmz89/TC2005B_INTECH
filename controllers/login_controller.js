const express = require('express');
const router = express.Router();

//const Login = require('../models/login');

exports.getLogin = (request, response, next) => {
    response.render('Login', {
        title: 'Inicia sesion',
        //isLoggedIn: request.session.isLoggedIn === true ? true : false
    })
};

exports.postLogin = (request, response, next) => {
    request.session.isLoggedIn = true;
    request.session.usuario = request.body.usuario;
    response.redirect('/');
};

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        response.redirect('/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};