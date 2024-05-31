const app = require('./app/app.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { dburl, configPort } = require('./config');

app.use(bodyParser.json());

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
