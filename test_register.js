const mongoose = require('mongoose');
const RegisteredUser = require('./app/models/registeredUser');

const user = {
  email: 'carlomazzone@gmail.com',
  password: 'password',
  username: 'carlomazzone',
}

fetch('http://localhost:8080/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: user.email,
    password: user.password,
    username: user.username,
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
  console.error('Error:', error);
});