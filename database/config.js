
// Importación del paquete
const mongoose = require('mongoose');

// Función que establece la conexión
const dbConnection = async () => { // async permite trabajar con promesas asincronas y return otra promesa

    try{
        mongoose.connect(process.env.DB_CNN); 

        console.log('BD onlinne')

    }catch(error){
        console.log(error);
        throw new Error('-->> ERROR NO SE LOGRÓ CONECTAR');
    }

}

// Para exportar la función
module.exports = {
    dbConnection
}