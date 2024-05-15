const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dburl, configPort } = require('./config');
const RegisteredUser = require('./app/models/registeredUser');

const app = express();
app.use(bodyParser.json());

// Function to save a registered user
async function saveRegisteredUser(email, password, username) {
    try {
        // Create a new user instance
        const user = new RegisteredUser({ email, password, username });
        // Check if a user with the same email already exists in the database
        const existingUser = await RegisteredUser.findOne({ email });

        if (existingUser) {
            console.log('User with the same email already exists');
            return;
        }

        // Save the user to the database
        const savedUser = await user.save();

        console.log('User saved:', savedUser);
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

// Endpoint to register a user
app.post('/register', (req, res) => {
    const { email, password, username } = req.body;
    saveRegisteredUser(email, password, username);
    res.send({ message: 'User registration successful' });
});

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
