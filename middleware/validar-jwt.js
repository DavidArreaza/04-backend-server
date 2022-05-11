
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

/**
 * Validar JWT
 * @param {} req 
 * @param {*} res 
 * @param {*} next 
 */
const validarJWT = (req, res, next) => {

    //Leer token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay TOKEN en la petición'
        })
    }

    try{

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();

    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'TOKEN no valido'
        })
    }
}

const validarAdminRol = async(req, res, next) =>{

    const uid = req.uid;

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            })
        }
        
        if( usuarioDb.rol != 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene autorización'
            })
        }

        next();

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error validar Rol'
        })
    }

}

module.exports = { validarJWT, validarAdminRol }