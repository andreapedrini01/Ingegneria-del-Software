/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const app = require('./app');
const { masterKey, dburl } = require('../config');
const mongoose = require('mongoose');
const Token = require('./models/token');

describe('GET /api/v1/users/me', () => {

  // Mocking User.findOne method
  let userSpy;

  beforeAll(async () => {
    await mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
    const User = require('./models/registeredUser');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
      return {
        email: 'example@example.com'
      };
    });
  });

  afterAll(() => {
    userSpy.mockRestore();
  });

  test('GET /api/v1/users/me with no token should return 401', async () => {
    const response = await request(app).get('/api/v1/users/me');
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/v1/users/me?token=<invalid> should return 401', async () => {
    const response = await request(app).get('/api/v1/users/me?token=123456');
    expect(response.statusCode).toBe(401);
  });

  test('GET /api/v1/users/me?token=<valid> should return 200', async () => {
    const payload = {
      email: 'example@example.com',
      id: '66571405ef5c8c00f380591b'
    };
    const options = {
      expiresIn: 86400 // expires in 24 hours
    };
    const token = jwt.sign(payload, masterKey, options);

    let tkn = new Token({
      userId: payload.id,
      token: token,
    });
    tkn = await tkn.save();

    const response = await request(app).get(`/api/v1/users/me?token=${token}`);
    expect(response.statusCode).toBe(200);
  });

  test('GET /api/v1/users/me?token=<valid> should return user information', async () => {
    const payload = {
      email: 'example@example.com',
      id: '66571405ef5c8c00f380591b'
    };
    const options = {
      expiresIn: 86400 // expires in 24 hours
    };
    const token = jwt.sign(payload, masterKey, options);

    let tkn = new Token({
      userId: payload.id,
      token: token,
    });
    tkn = await tkn.save();

    const response = await request(app).get(`/api/v1/users/me?token=${token}`);
    const user = response.body;
    expect(user).toBeDefined();
    expect(user.email).toBe('example@example.com');
  });

  test('GET /api/v1/users should return list of users', async () => {
    const response = await request(app).get('/api/v1/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe('POST /api/v1/users/register', () => {
  beforeAll(async () => {
    await mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
    const User = require('./models/registeredUser');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
      return {
        email: 'example@example.com'
      };
    });
  });

  afterAll(() => {
    userSpy.mockRestore();
  });

  test('POST /api/v1/users/register the field email has not be empty string should return 400', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      expect(response.statusCode).toBe(400);
  });
      
});
