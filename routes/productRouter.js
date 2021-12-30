const express = require('express')
const router = express.Router();


router.get('/', (req, res, next) => {
    if (!req.query.category || isNaN(req.query.category)) {
        req.query.category = 0
    }
    if (!req.query.brand || isNaN(req.query.brand)) {
        req.query.brand = 0
    }
    if (!req.query.color || isNaN(req.query.color)) {
        req.query.color = 0
    }
    if (!req.query.min || isNaN(req.query.min)) {
        req.query.min = 0
    }
    if (!req.query.max || isNaN(req.query.max)) {
        req.query.max = 100
    }


    let categoryController = require('../controllers/categoryController')
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data;
            let brandController = require('../controllers/brandController')
            return brandController.getAll(req.query);
        })
        .then(data => {
            res.locals.brands = data;
            let colorController = require('../controllers/colorController')
            return colorController.getAll(req.query);
        })
        .then(data => {
            res.locals.colors = data;
            let productController = require('../controllers/productController')
            return productController.getAll(req.query);
        })
        .then(data => {
            res.locals.products = data;

            res.render('category')
        })

        .catch(error => next(error));
})



router.get('/:id', (req, res) => {
    let productController = require('../controllers/productController')
    productController
        .getById(req.params.id)
        .then(product => {
            res.locals.products = product
            // console.log(product)
            res.render('single-product')

        })
})


module.exports = router;