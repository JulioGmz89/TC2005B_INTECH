const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const profileController = require('../controllers/profile_controller');

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', profileController.getProfile);

module.exports = router;
