/**
 * @brief Ruta hacia los proyectos individuales
 * @param {*} proyectoXController -> Conexión con el controlador
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const isAuth = require('../utils/is-auth');
const bodyParser = require('body-parser');

const proyectoXController = require('../controllers/proyectoX_controller');
const { Router } = require('express');

router.use(bodyParser.urlencoded({extended: false}));

/**
 * @brief Coneccion con cada proyecto y sus subrutas dependiendo del id de este
 */

router.get('/:id_proyecto/puntos-agiles', isAuth, proyectoXController.getPA);
router.get('/:id_proyecto/casos-uso', isAuth, proyectoXController.getCasoUso);
router.post('/:id_proyecto/airtable', isAuth, proyectoXController.postAirtable);
router.get('/:id_proyecto/airtable', isAuth, proyectoXController.getAirtable);
router.get('/:id_proyecto', isAuth, proyectoXController.getProyectoX);

module.exports = router;
