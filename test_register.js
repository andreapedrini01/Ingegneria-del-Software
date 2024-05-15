const mongoose = require('mongoose');
const RegisteredUser = require('./app/models/registeredUser');

fetch('http://localhost:8080/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'sfsdf@fsvdv',
    password: 'sfvsfg',
    username: 'fiugetiug',
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
  console.error('Error:', error);
});