// backend server.js
const express = require('express');
const mongoose =  require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

dotenv.config();
// initialize express 
const app = express();

// we set middleware
app.use(express.json()); // to parse json bodies
app.use(cors()); // allow cross origin requests

// mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.log('MongoDB connection Failed!!!'));

// set the routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

// routes for product
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// routes for orders
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

// routes for payments
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

// authentications routes and product routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// we start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});