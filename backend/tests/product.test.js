// test product crud operations

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Product = require('../models/Product');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Login as admin to get token
  const loginRes = await request(app).post('/api/auth/login').send({
    email: 'admin@example.com',
    password: 'Admin1234',
  });
  token = loginRes.body.token;
});

afterAll(async () => {
  await Product.deleteMany();
  await mongoose.connection.close();
});

describe('Product Endpoints', () => {
  it('should add a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Sample Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Sample Product');
  });

  it('should retrieve all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should retrieve a single product', async () => {
    const product = await Product.findOne({ title: 'Sample Product' });
    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Sample Product');
  });

  it('should update a product', async () => {
    const product = await Product.findOne({ title: 'Sample Product' });
    const res = await request(app)
      .put(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Product Title' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Product Title');
  });

  it('should delete a product', async () => {
    const product = await Product.findOne({ title: 'Updated Product Title' });
    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted successfully');
  });
});