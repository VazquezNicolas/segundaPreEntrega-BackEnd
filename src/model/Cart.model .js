const mongoose = require('mongoose')

const collectionName = 'carts'

const collectiosSchema = new mongoose.Schema({
    idCart: Number,
    products: {
        type: [
            {
                products: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
            }
            }
        ],
        default: [],
    }
})

const Carts = mongoose.model(collectionName, collectiosSchema)

module.exports = Carts