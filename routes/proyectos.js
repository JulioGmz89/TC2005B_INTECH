const express = require('express');
const router = express.Router();
const path = require('path');
const isAuth = require('../utils/is-auth');
const bodyParser = require('body-parser');
const proyectosController = require('../controllers/proyectos_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', isAuth, proyectosController.getProyectos);
router.post('/', isAuth, proyectosController.postNuevoProyecto);


module.exports = router;

