
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

// Rutas (en postman donde hacer las peticiones)
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


// Puerto
app.listen( process.env.PORT, () =>{
    console.log('SERIVIDOR FUNCIONANDO ' + process.env.PORT);
});