// Importaciones
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


/**
 * Busca en la bbdd el valor dado
 * @param {*} req 
 * @param {*} res 
 */
const getAll = async(req, res = response) =>{

    const param = req.params.busqueda; // lo que se busca
    const regex = new RegExp(param, 'i'); //hace insensible la búsqueda
    
    // Así es más lento se ejecuta uno de tras de otro
    // const usuarios   = await Usuario.find({ nombre : regex });
    // const medicos    = await Medico.find({ nombre : regex });
    // const hospitales = await Hospital.find({ nombre : regex });

    // Todos la vez
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre : regex }),
        Medico.find({ nombre : regex }),
        Hospital.find({ nombre : regex })
    ]);


    res.json({
        ok: true,
        usuarios, 
        medicos,
        hospitales
    })
};

/**
 * 
 */
const getDocumentosColeccion = async(req, res = response) =>{

    const tabla = req.params.tabla;
    const param = req.params.busqueda; // lo que se busca
    const regex = new RegExp(param, 'i'); //hace insensible la búsqueda

    let data = [];
    
    switch ( tabla ){
        case 'medicos':
            data = await Medico.find({ nombre : regex })
                                                    .populate('usuario', 'nombre img')
                                                    .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre : regex }).populate('usuario', 'nombre img'); 
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre : regex });
        break;

        default:
            return res.status(400).json({
                ok:false,
                msg: 'No existe la tabla especificada'
            });
    };
 
    res.json({
        ok: true,
        resultados: data
    });

};

module.exports = { getAll, getDocumentosColeccion }