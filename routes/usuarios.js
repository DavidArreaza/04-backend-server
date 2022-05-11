/*

    Ruta:: /api/usuarios

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validacionCampos, validarCampos } = require('../middleware/validar-campos');

const { getUser, postUser, updateUser, deleteUser } = require('../controllers/usuarios');
const { validarJWT, validar_AdminRol_MismoUser } = require('../middleware/validar-jwt');

const router = Router();

router.get( '/', validarJWT, getUser);

router.post('/',
 [
    check('nombre', 'Campo nombre obligatorio').notEmpty(),
    check('password', 'Campo password obligatorio').notEmpty(),
    check('email', 'Campo email obligatorio').isEmail(),
    validarCampos //Siempre despues de los check
 ],
 postUser);

 router.put( '/:uid', validarJWT, validar_AdminRol_MismoUser,
 [
    check('nombre', 'Campo nombre obligatorio').notEmpty(),
    check('email', 'Campo email obligatorio').isEmail(),
    check('rol', 'Campo rol obligatorio').notEmpty(),
    validarCampos //Siempre despues de los check
 ],
  updateUser); //update

  router.delete( '/:uid', [validarJWT, validar_AdminRol_MismoUser], deleteUser)

module.exports = router;