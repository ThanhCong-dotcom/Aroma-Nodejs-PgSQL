const express = require("express");
const expressHbs = require('express-handlebars')
require('dotenv').config()

let app = express();

//set public sattic
app.use(express.static(__dirname + '/public'))


//Use view engine

let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
})
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');



// Define route here
app.use('/', require('./routes/indexRouter'))
app.use('/products', require('./routes/productRouter'))

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



//Set port
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`server is running localhost:${app.get('port')}`)
})