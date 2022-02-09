// Importaciones
const { response } = require('express');
const bcrypt =  require('bcryptjs')

const Usuario = require('../models/usuario');

/*
    Devuelve todos los usuario
*/
const getUsuarios = async(req, res) =>{

    const usuarios = await Usuario.find();
    // const usuarios = await Usuario.find({}, 'nombre email'); //Para filtrar

    res.json({
        ok : true,
        usuarios
    });
};


/*
    Crear usuario
*/
const postUsuario = async(req, res = response) =>{

    //Coge los datos del boyd
    const {password, email} = req.body;

    try{

        //Para verificar que el email es único
        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'EL CORREO YA ESTÁ REGISTRADO'
            });
        };

        //Los almacena en un usuario
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //genera de forma aleatoria
        usuario.password = bcrypt.hashSync( password, salt );

        //Los guarda (Promise). Para poder usar el awit debe ser una función async
        // Se pone el awit porque al ser una promise puede fallar más abajo. Para que termine antes de seguir
        await usuario.save();

        res.json({
            ok : true,
            usuario
        });
    }catch (error){
        console.log(error);
        res.status(500).json({ // STATUS importación de response
            ok: false,
            msg: '--> ERROR POST'
        });
    };
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateUsuario = async(req, res = response) =>{
    // TODO: Validar token y comprobar si es usuer correcto
    const uid = req.params.uid;

    try{
        //Busca el usuario por su id
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                uid,
                msg: 'No existe ese usuario',
            })
        };
        // Actualizaciones
        const datos = req.body;

        if(usuarioDB.email === req.body.email){
            delete datos.email;
        }else{
            const existEmail = await Usuario.findOne({email: req.body.email})
            if( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un user con ese email'
                })
            }
        }

        delete datos.password; //Elimina del body no de la bbdd
        delete datos.google;

        const userUpdate = await Usuario.findByIdAndUpdate(uid, datos, {new: true}); //Para que devuelva el nuevo de primeras        

        res.json({
            ok: true,
            msg: 'Update ok!',
            usuario: userUpdate
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: '--> ERROR UPDATE'
        });
    }
}

module.exports = { getUsuarios, postUsuario, updateUsuario }