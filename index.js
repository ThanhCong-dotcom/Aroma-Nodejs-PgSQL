const express = require("express");
const expressHbs = require('express-handlebars')
const helper = require('./controllers/helper')
const paginateHelper = require('express-handlebars-paginate')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const Cart = require('./controllers/cartController')
require('dotenv').config()

let app = express();

//set public sattic
app.use(express.static(__dirname + '/public'))

//Use view engine

let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        createStarList: helper.createStarList,
        createStar: helper.createStar,
        createPaginate: paginateHelper.createPagination

    }
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// // Cookie-parser
app.use(cookieParser())

// // session 
app.use(session({
    cookie: { httpOnly: true, maxAge: null },// null sẽ mất khi tắt trình duyệt 
    secret: 'S3cret',
    resave: false,
    saveUninitialized: false
}))

app.use('/users', require('./routes/userRouter'))

app.use((req, res, next) => {


    var cart = new Cart(req.session.cart ? req.session.cart : {})
    req.session.cart = cart; // gan doi tuong cart cho session 
    res.locals.totalQuantity = cart.totalQuantity
    res.locals.fullname = req.session.user ? req.session.user.fullname : ''
    res.locals.isLoggedIn = req.session.user ? true : false

    next();
})
app.use('/', require('./routes/indexRouter'))
app.use('/products', require('./routes/productRouter'))
app.use('/cart', require('./routes/cartRouter'))
app.use('/comments', require('./routes/commentRouter'))
app.use('/reviews', require('./routes/reviewRouter'))

//Use Cart


// Define route here

//generate DB
// app.get('/sync', (req, res) => {
//     let models = require('./models')
//     models.sequelize.sync()
//         .then(() => {
//             res.send('Database sync completed')
//         })

// })


app.get('/:page', (req, res) => {
    let banners = {
        blog: 'Our blog',
        cart: 'Our Cart',
        category: 'Shop Category',
        checkout: 'Product Checkout',
        confirmation: 'Order Confirmation',
        contac: 'Contact Us',
        login: 'Login / Register',
        register: 'Register',
        singleblog: 'Blog Details',
        singleproduct: 'Shop Single',
        trackingorder: 'Order Tracking'
    }
    let page = req.params.page
    res.render(page, { banner: banners[page] })
})

// Body parser


//Set port
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`server is running localhost:${app.get('port')}`)
})