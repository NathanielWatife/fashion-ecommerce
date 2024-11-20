const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, 
            quantity: {type: Number, required: true},
        }
    ],
    totalAmount: {type: Number, required: true},
    status: {type: String, default: 'Pending'},
    paymentStatus: {type: String, default: "Unpaid"},
    shippingAddress: {
        name: {type: String},
        address: {type: String},
        city: {type: String},
        postalCode: {type: String},
        country: {type: String},
    },
    payMethod: { type: String, default: 'Stripe'},
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;