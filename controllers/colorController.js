const controller = {}
const models = require('../models')
const Color = models.Color
const Sequelize = require('sequelize')
const Op = Sequelize.Op
controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {

            include: [{
                model: models.ProductColor, include: [{
                    model: models.Product, attributes: [], where: {
                        price: {
                            [Op.gte]: query.min,
                            [Op.lte]: query.max,
                        }
                    }
                }]
            }],
            attributes: ['id', 'name', 'imagepath', 'code']

        }
        if (query.category > 0) {
            options.include[0].include[0].where.categoryId = query.category
        }

        if (query.brand > 0) {
            options.include[0].include[0].where.brandId = query.brand
        }
        if (query.search != '') {
            options.include[0].include[0].where.name = {
                [Op.iLike]: `%${query.search}%`
            }
        }
        Color
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


module.exports = controller;