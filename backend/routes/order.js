// backend/routes/order.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const Order = require('../models/Order');


// Create new order
router.post('/', authMiddleware, async (req, res) => {
    try {
        const {items, totalAmount} = req.body;
        const order = new Order({
            userId: req.user.id,
            items,
            totalAmount,
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Get all order for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// User routes
router.post('/', authMiddleware, createOrder);  // Ensure 'createOrder' is correctly defined
router.get('/:id', authMiddleware, getOrderById);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
