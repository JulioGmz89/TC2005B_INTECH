const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const proyectosController = require('../controllers/proyectos_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', proyectosController.getProyectos);
router.post('/', proyectosController.postNuevoProyecto);


module.exports = router;

