const {Schema, model} = require('mongoose');

//Esquema de la tabla hospital //Se crea automaticamente en la BBDD
const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        requiered: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        requiered: true
    }
});

MedicoSchema.method('toJSON', function() {
    //"Elimina" __v
    const {__v, ...object} = this.toObject(); 
    return object;
})


module.exports = model('Medico', MedicoSchema);
