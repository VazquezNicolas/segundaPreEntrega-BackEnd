const mongoose = require('mongoose')

const collectionName = 'products'

const collectiosSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
})

const Products = mongoose.model(collectionName, collectiosSchema)

module.exports = Products