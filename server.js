const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dburl, configPort } = require('./config');

const usersRouter = require('./app/users');

const app = express();
app.use(bodyParser.json());
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('Hello world');
});

//connect to MongoDB
mongoose.connect(dburl)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(configPort, function() {
    console.log('Server started on port ', configPort);
});
