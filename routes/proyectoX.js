const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const proyectoXController = require('../controllers/proyectoX_controller');
const { Router } = require('express');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/:id_proyecto/PA', proyectoXController.getPA);
router.get('/:id_proyecto/CU', proyectoXController.getCasoUso);
router.get('/:id_proyecto/Airtable', proyectoXController.getAirtable);
router.get('/:id_proyecto/', proyectoXController.getProyectoX);

module.exports = router;
