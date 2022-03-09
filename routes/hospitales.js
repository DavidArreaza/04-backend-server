/**
 * ruta: '/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const { getHospitales, postHospitales, updateHospitales, deleteHospitales } = require('../controllers/hospitales');

const router = Router();

router.get( '/', getHospitales);

router.post('/',
    [
      validarJWT,
      check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
      validarCampos
    ],
  postHospitales
);


 router.put( '/:uid',
    [
      validarJWT,
      check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
      validarCampos
    ],
    updateHospitales
  ); //update


  router.delete( '/:uid', validarJWT, deleteHospitales)

module.exports = router;