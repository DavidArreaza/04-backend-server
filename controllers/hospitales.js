const { response } = require('express');
const hospital = require('../models/hospital');

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

const updateHospitales = async(req, res = response) =>{

    const idHospital = req.params.uid;
    const uidUsuario = req.uid

    try {

        const hostpitalDB = await Hospital.findById ( idHospital );

        if( !hostpitalDB ){
            return res.status(404).json({
                ok: false,
                msg: 'El hospital no existe'
            })
        }

        const cambiosHospitales = {
            ...req.body,
            usuario: uidUsuario
        };

        const hospitalUpdate = await Hospital.findByIdAndUpdate( idHospital, cambiosHospitales, { new: true });

        res.json({
            ok: true,
            msg: 'update TODO OK',
            hospitalUpdate
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error update'
        });
    }

}

const deleteHospitales = async(req, res = response) =>{
    const uid = req.params.uid;

    const idHospital = req.params.uid;
    const uidUsuario = req.uid

    try{
        //Busca el usuario por su id
        const hospitalDB = await Hospital.findById( idHospital );

        if(!hospitalDB){
            return res.status(404).json({
                ok: false,
                uid,
                msg: 'No existe ese hospital',
            })
        };

        await Hospital.findByIdAndDelete( idHospital )

        res.json({
            ok: true,
            msg: 'Hospital eliminado',
            idHospital
        })

    }catch{
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error delete hospital'
        });
    }
}

module.exports = { getHospitales, postHospitales, updateHospitales, deleteHospitales }