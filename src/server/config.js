const path = require('path');
const exphbs = require('express-handlebars');

const morgan = require('morgan');
const multer = require('multer');
const express = require('express');

const routes = require('../routes/index');

const errorHandler = require('errorhandler');

module.exports = app => {

    //configuraciones

    app.set('port', process.env.PORT || 3001); //Estoy diciendo que utilice un puerto del sistema, en caso de que no haya uno disponible, utilice el puerto 3000
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main', 
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        
    }));

    app.set('view engine', '.hbs') //De la linea de app.engine hasta esta, se configuró los handlebars

    

    //middlewares

    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'))
    app.use(express.urlencoded({extended: false})) //recepciópn de datos recibios por formularios (img)
    app.use(express.json());
    

    //rutas

    routes(app)

    //archivos estáticos - static files

    app.use('/public',express.static(path.join(__dirname, '../public')))

    //errorhandlers

    if ('development' === app.get('env')){
        app.use(errorHandler);
    }

    return app;
}

//partials: son pedazos de html que podemos reutilizar en la app