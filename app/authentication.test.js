const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./app');
const { masterKey } = require('../config');
const RegisteredUser = require('./models/registeredUser');
const Token = require('./models/token');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

jest.mock('../utils/sendEmail');

describe('GET /api/v1/authentications', () => {

    let userSpy;

    beforeAll(() => {
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

    //scrivi i test da qui in poi

    test('GET /api/v1/authentications with no token should return 404', async () => {
        const response = await request(app).get('/api/v1/authentications');
        expect(response.statusCode).toBe(404);
    });
});
