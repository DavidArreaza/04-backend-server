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

/**
 * Update medico
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateMedicos = async(req, res = response) =>{

    const idMedico = req.params.uid;
    const uidUsuario = req.uid
    const uidHospital = req.body.hospital;

    try {

        const medicoDB = await Medico.findById ( idMedico );

        if( !medicoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'El médico no existe'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uidUsuario,
            hospital: uidHospital
        };

        const medicoUpdate = await Medico.findByIdAndUpdate( idMedico, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'update TODO OK',
            medico: medicoUpdate
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error update médicos'
        });
    }
}

/**
 * Eliminar un médico
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteMedicos = async(req, res = response) =>{

    const idMedico = req.params.uid;

    try{
        //Busca el usuario por su id
        const medicoDB = await Medico.findById( idMedico );

        if(!medicoDB){
            return res.status(404).json({
                ok: false,
                uid,
                msg: 'No existe el médico',
            })
        };

        await Medico.findByIdAndDelete( idMedico )

        res.json({
            ok: true,
            msg: 'Médico eliminado'
        })

    }catch{
        res.status(500).json({
            ok: false,
            msg: 'Error delete médicos'
        });
    }
}

module.exports = { getMedicos, postMedicos, updateMedicos, deleteMedicos }