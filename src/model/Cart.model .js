const mongoose = require('mongoose')

const collectionName = 'carts'

const collectionsSchema = new mongoose.Schema({
    
    products: {
        type: [
            {
                 product: {
                    type: mongoose.Schema.Types.ObjectId ,
                    ref: 'products'
                 },
            },
        ],
        default: [],
    }
})

collectionsSchema.pre('find', function(){
    this.populate('products.product')
})

const Carts = mongoose.model(collectionName, collectionsSchema)

module.exports = Carts