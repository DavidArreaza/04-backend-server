// Importaciones
const { response } = require('express');
const bcrypt =  require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

/*
    Devuelve todos los usuario
*/
const getUser = async(req, res) =>{

    const view = Number(req.query.view) || 0; //si indica la cantidad a paginar

    //Para que se ejecuten en paralelo
    const [usuarios, total] = await Promise.all([
        Usuario.find()
                    .skip( view ) //para que salte los primeros que se indican
                    .limit( 5 ),  //por defecto en 5

        Usuario.count()
    ])

    res.json({
        ok : true,
        usuarios,
        total
        //uid: req.uid //uid del que hizo la petición
    });
};


/*
    Crear usuario
*/
const postUser = async(req, res = response) =>{

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

        //Generar JWT
        const token = await generarJWT(usuario.id)

        //Los guarda (Promise). Para poder usar el awit debe ser una función async
        // Se pone el awit porque al ser una promise puede fallar más abajo. Para que termine antes de seguir
        await usuario.save();

        res.json({
            ok : true,
            usuario,
            token
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
 * Update user
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async(req, res = response) =>{
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
        const {password, google, email, ...datos} = req.body; //lo saca de la respuesta

        if(usuarioDB.email !== email){
            const existEmail = await Usuario.findOne({email})
            if( existEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un user con ese email'
                });
            }
        }

        datos.email = email;

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

/**
 * Eliminar usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteUser = async(req, res = response) =>{
    const uid = req.params.uid;

    try{
        //Busca el usuario por su id
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            console.log("ENTRO")
            return res.status(404).json({
                ok: false,
                uid,
                msg: 'No existe ese usuario',
            })
        };

        await Usuario.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    }catch{
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: '--> ERROR DELETE'
        });
    }
}

module.exports = { getUser, postUser, updateUser, deleteUser }