const express = require('express')
const router = express.Router();


router.post('/', (req, res, next) => {
    let commentController = require('../controllers/commentController')
    let comment = {
        userId: 1,
        productId: req.body.productId,
        message: req.body.message
    }
    console.log(comment)
    if (!isNaN(req.body.parentCommentId) && (req.body.parentCommentId != '')) {
        comment.parentCommentId = req.body.parentCommentId
    }
    commentController
        .add(comment)
        .then(data => {
            //res.locals.getTrendingProducts = data
            res.redirect('/products/' + data.productId);
        })
        .catch(error => next(error));

})

module.exports = router;