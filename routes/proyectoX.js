const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const proyectoXController = require('../controllers/proyectoX_controller');
const { Router } = require('express');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/PA', proyectoXController.getPA);
router.get('/CU', proyectoXController.getCasoUso);
router.get('/', proyectoXController.getProyectoX);

module.exports = router;
