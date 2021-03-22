const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const proyectoXController = require('../controllers/proyectoX_controller')

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', proyectoXController.getCasoUso);
router.get('/PA', proyectoXController.getPA);

module.exports = router;
