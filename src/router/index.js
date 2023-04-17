const productsController = require ('./products/products.controller')
const cartsController = require ('./carts/carts.controller')

const router = app => {
    app.use('/carts', cartsController)
    app.use('/products', productsController)
}

module.exports = router