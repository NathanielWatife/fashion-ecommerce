const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddlwware');

// Public Route
router.get('/', getAllProducts);
router.get('/:id', getPrpductById);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:is', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;