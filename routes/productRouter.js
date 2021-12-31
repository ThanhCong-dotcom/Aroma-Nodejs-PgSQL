const { query } = require('express');
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

    if ((req.query.sort == null)) {
        req.query.sort = 'name'
    }
    if ((req.query.limit == null) || isNaN(req.query.limit)) {
        req.query.limit = 9
    }
    if ((req.query.page == null) || isNaN(req.query.page)) {
        req.query.page = 1
    }
    if ((req.query.search == null) || (req.query.search.trim() == '')) {
        req.query.search = ''
    }
    let categoryController = require('../controllers/categoryController')
    categoryController
        .getAll(req.query)
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