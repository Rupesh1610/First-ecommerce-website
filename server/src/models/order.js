const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [{ type: Object, required: true }],
    // products: [{ productId: { type: mongoose.Schema.Types.ObjectId, required: true }, quantity: { type: Number, default: 1 } }],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    status: { type: String, default: 'pending' }
}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;