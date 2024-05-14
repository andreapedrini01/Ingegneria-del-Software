const mongoose = require('mongoose');
const vegisteredUser = require('./models/registeredUser');
const verifiedUser = require('./models/verifiedUser');
const gruppo = require('./models/gruppo');
const centroRaccolta = require('./models/centroRaccolta');
const superUser = require('./models/superUser');

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
    Ruser.save(); 

    Suser = new SuperUser({

        password: "SuperUser",
        email: "superuser@admin",
    });
    Suser.save();
    SuperUser.find()
        .then((superusers) => {
            console.log('Superusers:', superusers);
        })
        .catch((error) => {
            console.error('Error querying superusers:', error);
        });*/

    registeredUser.find({username: "marco"})
        .then((registeredusers) => {
            console.log('Registeredusers:', registeredusers);
        })
        .catch((error) => {
            console.error('Error querying registeredusers:', error);
        });