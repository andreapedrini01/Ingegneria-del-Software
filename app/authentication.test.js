const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('./app');
const { masterKey } = require('../config');

describe('GET /api/v1/authentications', () => {
    
      // Moking User.findOne method
      let userSpy;
    
    beforeAll( () => {
        const User = require('./models/registeredUser');
        userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
            return {
                email: 'example@example.com'
            };
        });

        afterAll(async () => {
            userSpy.mockRestore();
        });

        //scrivi i test da qui in poi
    });


});