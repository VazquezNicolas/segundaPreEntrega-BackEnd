const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collectionName = 'products'

const collectionsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    thumbnail: String,
    code: String,
    stock: Number,
    status: Boolean,
    category: String,
})

collectionsSchema.plugin(mongoosePaginate)
const Products = mongoose.model(collectionName, collectionsSchema)

module.exports = Products