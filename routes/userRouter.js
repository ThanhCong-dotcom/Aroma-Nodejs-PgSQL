const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControlller')
const midleware = require('../middleware/isLoggedIn')

router.get('/login', (req, res) => {
    req.session.returnURL = req.query.returnURL
    res.render('login')
})


router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/login', (req, res, next) => {
    let email = req.body.username
    let password = req.body.password
    let keepLoggedIn = req.body.keepLoggedIn != undefined
    userController
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                if (userController.comparePassword(password, user.password)) {
                    req.session.cookie.maxAge = keepLoggedIn ? 30 * 24 * 60 * 60 * 60 * 1000 : null
                    req.session.user = user
                    if (req.session.returnURL) {
                        res.redirect(req.session.returnURL)
                    }
                    else {
                        res.redirect('/')

                    }
                } else {
                    res.render('login', {
                        message: 'Incorect Pass',
                        type: 'alert-danger'
                    })
                }
            } else {
                res.render('login', {
                    message: 'Email does not exists',
                    type: 'alert-danger'
                })
            }

        })
})
router.post('/register', (req, res, next) => {
    let fullname = req.body.fullname
    let email = req.body.username
    let password = req.body.password
    let confirmPassword = req.body.confirmPassword
    let keepLoggedIn = (req.body.keepLoggedIn != undefined)
    //kiem tra cofirm passs vaf pass giong nhau
    if (password != confirmPassword) {
        return res.render('register', {
            message: 'Confirm password does not match'
        })
    }
    // check user name chua ton tai
    userController.getUserByEmail(email)
        .then(user => {
            if (user) {
                return res.render('register', {
                    message: `Email ${email} exsist Please choose another eamil`,
                    type: 'alert-danger'
                })
            }
            user = {
                fullname,
                username: email,
                password
            }
            return userController.createrUser(user)
                .then(user => {
                    if (keepLoggedIn) {
                        req.session.cookie.maxAge = keepLoggedIn ? 30 * 24 * 60 * 60 * 60 * 1000 : null
                        req.session.user = user

                        res.redirect('/')
                    } else {
                        res.render('login', {
                            message: 'You have registered ,now login',
                            type: 'alert-success'

                        })
                    }

                }).catch(error => next(error))
        })

})

router.get('/logout', (req, res, next) => {
    req.session.destroy(error => {
        if (error) { return next(error) }
        else {
            return res.redirect('/users/login')
        }
    })
})
module.exports = router