// backend/routes/order.js
const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// User routes
router.post('/', authMiddleware, createOrder);  // Ensure 'createOrder' is correctly defined
router.get('/:id', authMiddleware, getOrderById);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
