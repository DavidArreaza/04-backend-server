const { response } = require('express');

const Medico = require('../models/medico');

/**
 * Obtener médicos
 * @param {*} req 
 * @param {*} res 
 */
const getMedicos = async(req, res = response) =>{

    //populate para que te mostrar más datos del usuario
    const medicos = await Medico.find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos: medicos
    })
}

/**
 * Crear médicos
 * @param {*} req 
 * @param {*} res 
 */
const postMedicos = async(req, res = response) =>{

    const uidUsuario = req.uid;
    const medico = new Medico({ //desestructurar
        usuario : uidUsuario,
        ...req.body
    });    

    try{

        await medico.save();

        res.json({
            ok : true,
            medico: medico
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ // STATUS importación de response
            ok: false,
            msg: '--> ERROR POST'
        });
    };
}

const updateMedicos = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'update TODO OK'
    })
}

const deleteMedicos = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'delete TODO OK'
    })
}

module.exports = { getMedicos, postMedicos, updateMedicos, deleteMedicos }