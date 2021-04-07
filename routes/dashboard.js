/**
 * @brief Ruta de dashboard
 * @param {*} dashboardController -> conexión con el controlador de dashboard
 */
const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const isAuth = require('../utils/is-auth');
const dashboardController = require('../controllers/dashboard_controller')

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', isAuth, dashboardController.getDashboard);


module.exports = router;

