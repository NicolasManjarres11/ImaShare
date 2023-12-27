const ctrl = {};
const {Image} = require('../models');
const sidebar = require('../helpers/sidebar')


ctrl.index = async (req, res, index) => {
    /* const images = await Image.find().sort({TimeRanges: -1}).lean();
    
    let viewModel = {images: []};
    viewModel.images = images;
    viewModel = await sidebar(viewModel)
    console.log(viewModel);
    res.render('index', {images: viewModel.images}); */

    try {
        const images = await Image.find()
          .sort({ timestamp: -1 })
          .lean({ virtuals: true });
    
        let viewModel = { images: [] };
        viewModel.images = images;
        viewModel = await sidebar(viewModel);
        console.log(viewModel.sidebar.comments[0].image);
        res.render("index", viewModel);
      } catch (error) {
        next(error);
      }
};


module.exports = ctrl; 

