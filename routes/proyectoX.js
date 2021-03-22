const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const PAControllers = require('../controllers/PA_controller')

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', PAControllers.getPA);

module.exports = router;
