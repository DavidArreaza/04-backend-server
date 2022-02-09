const {Schema, model} = require('mongoose');

//Esquema de la tabla usuario //Se crea automaticamente en la BBDD
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method('toJSON', function() {
    //"Elimina" los campos __v, _id y password
    const {__v, _id, password, ...object} = this.toObject(); 
    //Creo el uid con el valor del _id
    object.uid = _id
    return object;
})


module.exports = model('Usuario', UsuarioSchema);
