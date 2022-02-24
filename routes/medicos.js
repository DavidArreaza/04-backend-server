/**
 * ruta: '/api/medicos'
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middleware/validar-campos');
 
 const { validarJWT } = require('../middleware/validar-jwt');
 
 const { getMedicos, postMedicos, updateMedicos, deleteMedicos } = require('../controllers/medicos');
 
 const router = Router();
 
 router.get( '/', getMedicos);
 
 router.post('/',[
      validarJWT,
      check('nombre', 'El nombre del médico es obligatorio').notEmpty(),
      check('hospital', 'El hospital es obligatorio').notEmpty(),
      check('hospital', 'El id del hospital no es válido').isMongoId(),
      validarCampos
    ], postMedicos);
 
 
 router.put( '/:uid', [
    ], updateMedicos); //update
 
 
   router.delete( '/:uid', deleteMedicos)
 
 module.exports = router;