/**
 * ruta: '/api/all'
 */

 const { Router } = require('express');
 const { check } = require('express-validator');
 
 const { validarJWT } = require('../middleware/validar-jwt');
 
 const { getAll, getDocumentosColeccion } = require('../controllers/search');
 
 const router = Router();
 
 router.get( '/:busqueda', validarJWT, getAll);
 router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

 
 module.exports = router;