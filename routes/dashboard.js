const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const isAuth = require('../utils/is-auth');
const loginController = require('../controllers/dashboard_controller')

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', isAuth, loginController.getDashboard);


module.exports = router;

