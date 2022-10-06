const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: Array
    },
    price: {
        type: String,
        required: true
    },
    inStock: { type: Boolean, default: true }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);
module.exports = Product;