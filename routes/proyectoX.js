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
const airtableController = require('../controllers/airtable_controller');
const PAController = require('../controllers/PA_controller');
const casoUsoController = require('../controllers/casoUso_controller');
const { Router } = require('express');

router.use(bodyParser.urlencoded({ extended: false }));

/**
 * @brief Coneccion con cada proyecto y sus subrutas dependiendo del id de este
 */
router.post('/:id_proyecto/puntos-agiles/tarea', isAuth, PAController.postNuevaTarea);
router.post('/:id_proyecto/puntos-agiles/fase', isAuth, PAController.postNuevaFase);
router.post('/:id_proyecto/puntos-agiles/PA', isAuth, PAController.postValorPA);
router.get('/:id_proyecto/puntos-agiles/:email_usuario/PA', isAuth, PAController.getValorPA);
router.get('/:id_proyecto/puntos-agiles', isAuth, PAController.getPA);

router.get('/:id_proyecto/casos-uso', isAuth, casoUsoController.getCasoUso);
router.post('/:id_proyecto/casos-uso', isAuth, casoUsoController.postNuevoCaso);
router.delete('/:id_proyecto/casos-uso', isAuth, casoUsoController.deleteCaso);
router.post('/:id_proyecto/casos-uso/tareas', isAuth, casoUsoController.postGuardarTareas);
router.post('/:id_proyecto/casos-uso/actualizar', isAuth, casoUsoController.updateCaso);

router.post('/:id_proyecto/airtable', airtableController.postAirtable);
router.get('/:id_proyecto/airtable', isAuth, airtableController.getAirtable);

// Peticiones AJAX de Airtable
router.get('/:id_proyecto/airtable_data', airtableController.getAirtableData);
router.get('/:id_proyecto/db_data', airtableController.getTareas);
router.post('/:id_proyecto/sync/update_airtable', airtableController.postUpdateAirtable);
router.post('/:id_proyecto/sync/update_db', airtableController.postUpdateDB);

router.get('/:id_proyecto', isAuth, proyectoXController.getProyectoX);
router.post('/:id_proyecto', isAuth, proyectoXController.postEditarProyecto);

module.exports = router;

// , isAuth