const express = require('express')
const router = express.Router();
const midleware = require('../middleware/isLoggedIn')


router.post('/', midleware.isLoggedIn, (req, res, next) => {
    let commentController = require('../controllers/commentController')
    let comment = {
        userId: req.session.user.id,
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