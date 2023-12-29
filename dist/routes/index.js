const express = require('express');
const router = express.Router(); //permite crear un objeto que defina los urls o las rutas en el servidor

const home = require('../controllers/home')
const image = require('../controllers/image')

module.exports = app => {
    router.get('/', home.index);
    router.get('/images/:images_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:images_id/like', image.like);
    router.post('/images/:images_id/comment', image.comment);
    router.delete('/images/:images_id', image.remove);

    app.use(router)



}