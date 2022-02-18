const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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

module.exports = { login }