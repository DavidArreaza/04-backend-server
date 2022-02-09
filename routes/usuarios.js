/*

    Ruta:: /api/usuarios

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validacionCampos, validarCampos } = require('../middleware/validar-campos');

const { getUsuarios, postUsuario, updateUsuario } = require('../controllers/usuarios');

const router = Router();

router.get( '/', getUsuarios);

router.post('/',
 [
    check('nombre', 'Campo nombre obligatorio').notEmpty(),
    check('password', 'Campo password obligatorio').notEmpty(),
    check('email', 'Campo email obligatorio').isEmail(),
    validarCampos //Siempre despues de los check
],
 postUsuario);

 router.put( '/:uid', [
    check('nombre', 'Campo nombre obligatorio').notEmpty(),
    check('email', 'Campo email obligatorio').isEmail(),
    check('rol', 'Campo rol obligatorio').notEmpty(),
    validarCampos //Siempre despues de los check
 ],
  updateUsuario); //update

module.exports = router;