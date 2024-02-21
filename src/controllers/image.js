const path = require('path');
const { randomName } = require('../helpers/libs')
const fs = require('fs-extra');
const { Image, Comment } = require('../models')
const sidebar = require('../helpers/sidebar')
const md5 = require('md5');


const ctrl = {};

ctrl.index = async (req, res) => {

    let viewModel = { image: {}, comments: {}}
    const image = await Image.findOne({filename: {$regex: req.params.images_id}}).lean();
    if (image) {
        image.views = image.views + 1; //como funciona es que toma la carga de la imagen como vista
        viewModel.image = image;
        await Image.updateOne({ _id: image._id}, {views: image.views});
    
        const comments = await Comment.find({image_id: image._id}).lean();
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel)
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    }
    

};

ctrl.create =  (req, res) => {

    const saveImage = async () => {
        const imgUrl = randomName();
        const images = await Image.find({ filename: imgUrl })
        if (images.length > 0) {
            saveImage();
        } else {
        console.log(imgUrl);
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif' || ext === '.webp') {
            await fs.rename(imageTempPath, targetPath); //rename lo que hace es un proceso de cortar y pegar
            const newImg = new Image({
                uniqueId: imgUrl,
                title: req.body.title,
                description: req.body.description,
                filename: imgUrl + ext,
            });

            const imgSaved = await newImg.save();
            res.redirect('/images/'+ imgUrl);
            

        } else {
            await fs.unlink(imageTempPath);
            res.status(500).json({ error: 'Solo se permiten imágenes' });
        }

        
    }}

    saveImage();






}

ctrl.like = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.images_id}}).lean();
    if (image) {
        image.likes = image.likes + 1
        await Image.updateOne({_id: image._id},{likes: image.likes})
        console.log(image.likes);
        res.json({likes: image.likes})
    }else {
        res.status(500).json({ error: 'Error interno' });
    }
}

ctrl.comment = async (req, res) => {
    
    const image = await Image.findOne({filename: {$regex: req.params.images_id}}).lean();
    if (image) {
        const newComment = new Comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id
        await newComment.save();
        res.redirect('/images/'+image.uniqueId);
    } else {
        res.redirect('/')
    }
    
    
    
}

ctrl.remove = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.images_id}}).lean();
    if (image){
        await fs.unlink(path.resolve('src/public/upload/' + image.filename))
        await Comment.deleteOne({_id: image._id});
        await Image.deleteOne({_id: image._id});
        res.json(true);
        
    }
}


module.exports = ctrl;