const mongoose = require('mongoose');


const ProductSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    stock: {
        typ: Number,
        default: 0
    },
    ratings: [
        {
            userId: mongoose.Schema.Types.ObjectId,
            rating: Number
        }
    ]
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;