const controller = {}
const { query } = require('express')
const models = require('../models')
const Color = models.Color

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {

            include: [{
                model: models.ProductColor, include: [{
                    model: models.Product, attributes: [], where: {}
                }]
            }],
            attributes: ['id', 'name', 'imagepath', 'code']

        }
        if (query.category) {
            options.include[0].include[0].where.categoryId = query.category
        }
        // if (query.color) {
        //     options.include[0].include = [{
        //         model: models.ProductColor,
        //         attributes: [],
        //         where: { colorId: query.color }
        //     }]
        // }
        if (query.brand) {
            options.include[0].include[0].where.brandId = query.brand
        }
        Color
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


module.exports = controller;