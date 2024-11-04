const mongoose = require('mongoose');
const User = require('./User');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        default: "Unpaid"
    },
}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;