const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const deleteImagen = ( path ) => {

    if( fs.existsSync(path) ){ //Si existe elimina la imagen anterior
        fs.unlinkSync(path);
    };

}


const updateImagen = async(tipo, id, nombreFile) =>{
    
    let pathViejo = '';

    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);
            
            if( !medico ){
                console.log("No se encontró el médico");
                return false;
            };

            pathViejo = `./uploads/medicos/${ medico.image }`;

            deleteImagen(pathViejo);

            medico.image = nombreFile;
            await medico.save();

            return true;

        break;

        case 'hospitales':

            const hospital = await Hospital.findById(id);
            
            if( !hospital ){
                console.log("No se encontró el hospital");
                return false;
            };

            pathViejo = `./uploads/hospitales/${ hospital.image }`;

            deleteImagen(pathViejo);

            hospital.image = nombreFile;
            await hospital.save();

            return true;

        break;

        case 'usuarios':
            
            const usuario = await Usuario.findById(id);
            
            if( !usuario ){
                console.log("No se encontró el usuario");
                return false;
            };

            pathViejo = `./uploads/usuarios/${ usuario.image }`;

            deleteImagen(pathViejo);

            usuario.image = nombreFile;
            await usuario.save();

            return true;

        break;
    };

}

module.exports = {updateImagen};