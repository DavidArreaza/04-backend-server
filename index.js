
//Como si fuera un import
require('dotenv').config();
const path = require('path');

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

// Directorio público
app.use(express.static('public'));

// Rutas (en postman donde hacer las peticiones)
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/all', require('./routes/searchs'));
app.use('/api/upload', require('./routes/uploads'));


// Controlar rutas en prod
app.get('*', (req, res) =>{
    res.sendFile( path.resolve( __dirname, 'public/index.html') );
});

// Puerto
app.listen( process.env.PORT, () =>{
    console.log('SERIVIDOR FUNCIONANDO ' + process.env.PORT);
});