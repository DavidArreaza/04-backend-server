
//Como si fuera un import
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor
const app = express();

// Configurar CORS
app.use(cors());

// Base de Datos
dbConnection(); 

// Rutas
app.get( '/', (req, res) =>{

    res.json({
        ok: true,
        msg: 'Hola del JSON'
    })

} );


// Puerto
app.listen( process.env.PORT, () =>{
    console.log('SERIVIDOR FUNCIONANDO ' + process.env.PORT);
});