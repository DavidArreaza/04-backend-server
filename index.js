
//Como si fuera un import
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear servidor
const app = express();

// Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );  

// Base de Datos
dbConnection(); 

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));


// Puerto
app.listen( process.env.PORT, () =>{
    console.log('SERIVIDOR FUNCIONANDO ' + process.env.PORT);
});