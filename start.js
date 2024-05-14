const express = require('express');

// Import required modules

// Create an instance of the Express application
const app = express();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});