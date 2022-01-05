const controller = {}
const models = require('../models')
const Comment = models.Comment

controller.add = (comment) => {
    return new Promise((resolve, reject) => {
        Comment
            .create(comment)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}


module.exports = controller;