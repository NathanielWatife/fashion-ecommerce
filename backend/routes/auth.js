// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure correct import path

// Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
