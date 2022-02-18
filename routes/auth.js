/*
    Path: 'api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();


router.post( '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La password es obligatorio').notEmpty(),
        validarCampos
    ],
    login
)



module.exports = router;