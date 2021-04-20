const express = require('express');
const contextInit = require('../utils/context_manager');
const user = require('../models/user');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = async (request, response, next) => {
    let context = await contextInit('Login', request);
    response.render('Login', context);
};

exports.postLogin = (request, response, next) => {
    request.session.error = "";
    const email = request.body.email_usuario;
    user.fetchOne(email)
        .then(([rows, fieldData]) => {
            if (rows.length < 1) {
                request.session.error = "El usuario y/o contraseña no coinciden";
                response.redirect('/login');
            } else {
                ;
                bcrypt.compare(request.body.password, rows[0].password_usuario)
                    .then(doMatch => {
                        if (doMatch) {
                            request.session.isLoggedIn = true;
                            request.session.usuario = request.body.email_usuario;
                            return request.session.save(err => {
                                response.redirect('/');
                            });
                        }
                        request.session.error = "El usuario y/o contraseña no coinciden";
                        response.redirect('/login');
                    }).catch(err => {
                        request.session.error = "El usuario y/o contraseña no coinciden";
                        response.redirect('/login');
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        response.redirect('/login');
    });
};

exports.postRegister = (request, response, next) => {
    request.session.error = "";
    if (request.body.password1 === request.body.password2) {
        const nuevoUser = new User(request.body.nombre_usuario, request.body.email_usuario, request.body.password1);
        nuevoUser.save()
            .then(() => {
                response.redirect('/login');
            }).catch(err => console.log(err));
    } else {
        request.session.error = "Las contraseñas no coinciden";
        response.redirect('/login');
    }
}