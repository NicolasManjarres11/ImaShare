const mongoose = require('mongoose');
const {Schema} = mongoose;
const path = require('path');

const ImageSchema = new Schema ({
    uniqueId: {type: String},
    title: {type: String},
    description: {type: String},
    filename: {type: String},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    timestamp : {type: Date, default: Date.now}
})

ImageSchema.virtual('uni')
    .get(function () {
        return this.filename.replace(path.extname(this.filename))
    });


module.exports = mongoose.model('Image', ImageSchema);

/* module.exports = {
    codigo: ImageSchema.virtual('uniqueId').get(function (){
        return this.filename.replace(path.extname(this.filename))
    })
} */

    
    

