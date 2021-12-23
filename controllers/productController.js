const controller = {}
const models = require('../models')
const Product = models.Product

controller.getTrendingProducts = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll(
                {
                    order: [
                        ['overallReview', 'DESC']
                    ],
                    limit: 8,
                    Include: [{ models: models.Category }],
                    attributes: ['id', 'name', 'price', 'imagepath']
                }
            )
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll(
                {

                    Include: [{ models: models.Category }],
                    attributes: ['id', 'name', 'price', 'imagepath']
                }
            )
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


module.exports = controller;