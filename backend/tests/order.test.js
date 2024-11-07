// test order creation and retrieval

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Login as a test user
  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'Test1234',
  });
  token = loginRes.body.token;

  // Create a sample product for order tests
  await new Product({ title: 'Order Test Product', price: 50, stock: 10 }).save();
});

afterAll(async () => {
  await Order.deleteMany();
  await Product.deleteMany();
  await mongoose.connection.close();
});

describe('Order Endpoints', () => {
  it('should create a new order', async () => {
    const product = await Product.findOne({ title: 'Order Test Product' });
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        products: [{ productId: product._id, quantity: 1 }],
        totalAmount: 50,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('totalAmount', 50);
  });

  it('should retrieve a user\'s order by ID', async () => {
    const order = await Order.findOne({ totalAmount: 50 });
    const res = await request(app)
      .get(`/api/orders/${order._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('totalAmount', 50);
  });
});