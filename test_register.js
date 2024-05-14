const mongoose = require('mongoose');
const RegisteredUser = require('./models/RegisteredUser');

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

//connect to MongoDB
mongoose.connect('mongodb+srv://marcomartinico:mongolia@cluster00.lfxhzww.mongodb.net/SpazzaTN', )
.then(() => {
    console.log('Connected to MongoDB');
    saveRegisteredUser('example@example.com', 'password123', 'exampleUser');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
