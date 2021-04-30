/**
 * @brief Rutas de LogIn -> Registro, LogIn, LogOut 
 * @param {*} loginController -> Conexión con el controlador de login
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const loginController = require('../controllers/login_controller')

router.use(bodyParser.urlencoded({extended: false}));

router.get('/', loginController.getLogin);
router.post('/', loginController.postLogin);
router.post('/register', loginController.postRegister);
router.get('/logout', loginController.getLogout);

module.exports = router;
