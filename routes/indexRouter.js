const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
    let categoryController = require('../controllers/categoryController')
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            let productController = require('../controllers/productController')
            return productController.getTrendingProducts()
        }).then(data => {
            res.locals.getTrendingProducts = data
            res.render('index');
        })
        .catch(error => next(error));

})

module.exports = router;