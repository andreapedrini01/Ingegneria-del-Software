fetch('http://localhost:8080/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'giorgio@gmail.com',
    password: 'password',
    username: 'carlomazzone',
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
  console.error('Error:', error);
});