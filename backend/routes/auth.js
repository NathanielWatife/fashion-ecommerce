const express = requrie('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

require.post(
    '/register',
    registerUser
);

require.post(
    '/login'.
    loginUser
);