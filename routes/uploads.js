/**
 * ruta: '/api/uploads'
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload'); //middleware
const { check } = require('express-validator');
const { fileUpdate } = require('../controllers/uploads');
 
const { validarJWT } = require('../middleware/validar-jwt');
 
//const { getAll, getDocumentosColeccion } = require('../controllers/search');
 
const router = Router();
 
router.use( expressFileUpload() );

router.put( '/:tipo/:id', validarJWT, fileUpdate);

 
module.exports = router;