const controller = {}
const models = require('../models')
const Brand = models.Brand

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        let options = {
            include: [{ model: models.Product, attributes: ['id'], where: {} }],
            attributes: ['id', 'name', 'imagepath'],

        }
        if (query.category) {
            options.include[0].where.categoryId = query.category // gán category truyền vào = category in DB
        }
        Brand
            .findAll(
                options
            )
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


module.exports = controller;