const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String,
    stock: Number
});

const ProductModel = mongoose.model('ProductModel', productSchema)

module.exports = ProductModel