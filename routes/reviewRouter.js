const express = require('express')
const router = express.Router();


router.post('/', (req, res, next) => {
    let reviewController = require('../controllers/reviewController')
    let review = {
        userId: 1,
        productId: req.body.productId,
        rating: req.body.rating,
        message: req.body.message
    }

    reviewController
        .add(review)
        .then(() => {
            //res.locals.getTrendingProducts = data
            res.redirect('/products/' + review.productId);
        })
        .catch(error => next(error));

})

module.exports = router;