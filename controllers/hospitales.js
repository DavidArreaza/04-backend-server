const { response } = require('express');

const Hospital = require('../models/hospital');

/**
 * Obtener todos los hospitales
 * @param {} req 
 * @param {*} res 
 */
const getHospitales = async(req, res = response) =>{

    //populate para que te mostrar más datos del usuario
    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })
}

/**
 * Crear hospital
 * @param {*} req 
 * @param {*} res 
 */
const postHospitales = async(req, res = response) =>{

    const uidUser = req.uid;
    const hospital = new Hospital({ //desestructuras
        usuario: uidUser,
        ...req.body
    });    

    try{

        await hospital.save();

        res.json({
            ok : true,
            hospital: hospital
        });

    }catch(error){
        console.log(error);
        res.status(500).json({ // STATUS importación de response
            ok: false,
            msg: '--> ERROR POST'
        });
    };
}

const updateHospitales = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'update TODO OK'
    })
}

const deleteHospitales = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'delete TODO OK'
    })
}

module.exports = { getHospitales, postHospitales, updateHospitales, deleteHospitales }