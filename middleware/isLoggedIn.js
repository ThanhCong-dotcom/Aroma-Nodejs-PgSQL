const controller = {}

controller.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.redirect(`/users/login?returnURL=${req.originUrl}`)
    }
}

module.exports = controller