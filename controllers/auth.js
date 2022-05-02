const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

/**
 * Login usuarios sin google
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async(req, res = response) =>{

    const { email, password } = req.body;

    try{

        const usuarioLoggeado = await Usuario.findOne({ email });

        // Verificar email
        if(!usuarioLoggeado){
            return res.status(404).json({
                ok:false,
                msg: 'No existe el email'
            });
        }

        // Verificar contraseña
        const validPass = bcrypt.compareSync( password, usuarioLoggeado.password )
        if(!validPass){
            return res.status(404).json({
                ok:false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar TOKEN - JWT
        const token = await generarJWT(usuarioLoggeado.id);

        res.json({
            ok: true,
            token
        })

    }catch(error){
        console.log(error);
        res.status(500),json({
            ok: false,
            msg: 'Erro Login'
        })
    }

}

/**
 * Login con Google
 * @param {*} req 
 * @param {*} res 
 */
const googleSignIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try{

        const {name, email, picture} = await googleVerify(googleToken);

        // Comprobación si exite el usuario ya
        const usuraioDB = await Usuario.findOne({email});
        let usuario;
        
        // Si no existe se crea
        if ( !usuraioDB ){
            usuario = new Usuario({
                nombre: name,
                email,
                password: 'pass Google',
                image: picture,
                google: true
            });

        } else {
            // Existe el usuario actualiza la variable de google
            usuario = usuraioDB;
            usuario.google = true;
        }

        //Guardar
        await usuario.save();

        // Generar TOKEN - JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            msg: 'Google SignIn funciona',
            token
        });

    }catch(error){
        res.status(401).json({
            ok: false,
            msg: 'Token no correcto'
        });
        console.log(error)
    }
}

/**
 * Renovar token
 * @param {*} req 
 * @param {*} res 
 */
const renewToken = async(req, res = response ) =>{

    const uid = req.uid; //uid del usuario
    const usuarioDB = await Usuario.findById(uid);

    // Generar TOKEN - JWT
    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token,
        usuarioDB
    });
}

module.exports = { login, googleSignIn, renewToken }