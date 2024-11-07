const Order = require('../models/Order');
const Product = require('../models/Product');

// create new order
exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const order = new Order({userId: req.user.userId, products, totalAmount});
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// get order by id
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products.productId');
        if (!order) return res.status(404).json({message: 'Order not found'});
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};


// get all orders admin only
exports.getAllOrders = async (req, res) => {
    try {
        const oders = await Order.find().populate('products.productId').populate('userID');
        res.json(order);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// update order status admin only
exports.updateOrderStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, {status}, {new: true});
        if (!order) return res.status(404).json({message: 'Order not found'});
        res.json(order);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};