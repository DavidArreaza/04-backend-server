const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require("../helpers/updateImagen");


const fileUpdate = (req, res = response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;

    const isTipoValido = ['hospitales', 'medicos', 'usuarios'];

    if( !isTipoValido.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'Tipo no válido'
        })
    };
    
    // Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se mandó ningún archivo'
        });
    };

    // Procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionFile = nombreCortado[nombreCortado.length -1] //última posición

    // Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if( !extensionesValidas.includes(extensionFile) ){
        return res.status(400).json({
            ok: false,
            msg: 'Extensión no válida'
        });
    };

    // Generar el nombre del archivo
    const nombreFile = `${ uuidv4() }.${ extensionFile }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreFile }`;

    // Mover imagen
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        };
          
        //Actualizar base de datos
        updateImagen(tipo, id, nombreFile);


        res.json({
            ok:true,
            tipo: tipo,
            msg: 'Archivo subido',
            nombreFile
        });
      });

}


const getFile = (req, res = response) => {
    const tipo = req.params.tipo;
    const photo = req.params.photo;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ photo }` );

    // Imagen por defecto
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }   

}

module.exports = { fileUpdate, getFile };