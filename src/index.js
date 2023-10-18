//index.js se utilizará para arrancar el servidor, pero la lógica estará guardada en la carpeta server
const express = require('express');

const config = require('./server/config')

//database
require('./database');

//inicializando servidor
const app = config(express()); //El objeto que se ejecute en express, se envía a config



app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});