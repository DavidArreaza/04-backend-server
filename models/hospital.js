const {Schema, model} = require('mongoose');

//Esquema de la tabla hospital //Se crea automaticamente en la BBDD
const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' }); //pone el nombre que quieras a la tabla

HospitalSchema.method('toJSON', function() {
    //"Elimina" __v
    const {__v, ...object} = this.toObject(); 
    return object;
})


module.exports = model('Hospital', HospitalSchema);
