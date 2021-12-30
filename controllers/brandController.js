const controller = {}
const models = require('../models')
const Brand = models.Brand
const Sequelize = require('sequelize')
const Op = Sequelize.Op
controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            include: [{
                model: models.Product, attributes: ['id'], where: {
                    price: {
                        [Op.gte]: query.min,
                        [Op.lte]: query.max,
                    }
                }
            }],
            attributes: ['id', 'name', 'imagepath']
        }

        if (query.category > 0) {
            options.include[0].where.categoryId = query.category // gán category truyền vào = category in DB
        }
        if (query.color > 0) {
            options.include[0].include = [{
                model: models.ProductColor,
                attributes: [],
                where: { colorId: query.color }
            }]
        }

        Brand
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


module.exports = controller;