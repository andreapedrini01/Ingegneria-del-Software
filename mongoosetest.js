const mongoose = require('mongoose');
const RegisteredUser = require('./models/RegisteredUser');
const VerifiedUser = require('./models/VerifiedUser');
const gruppo = require('./models/gruppo');
const CentroRaccolta = require('./models/CentroRaccolta');

mongoose.connect('mongodb+srv://marcomartinico:mongolia@cluster00.lfxhzww.mongodb.net/SpazzaTN', )
    .then(() => {
        console.log('Connected to MongoDB');
 
    
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
/*
    Ruser = new RegisteredUser({
        username: "marco",
        password: "password",
        email: "ciao",
    });    
    Ruser.save(); */