/**
 * @brief Rutas a la pagina donde se ven todos los proyectos del usuario
 * @param {*} proyectoXController -> conexión con el controlador de Proyectos
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const isAuth = require('../utils/is-auth');
const bodyParser = require('body-parser');
const proyectosController = require('../controllers/proyectos_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', proyectosController.getProyectos);
router.post('/', proyectosController.postNuevoProyecto);


module.exports = router;

// , isAuth