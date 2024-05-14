const mongoose = require('mongoose');
const registeredUser = require('./models/registeredUser');
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
    Ruser = new registeredUser({
        username: "marco",
        password: "password",
        email: "ciao",
    });    
    Ruser.save(); 

    Suser = new superUser({

        password: "superUser",
        email: "superuser@admin",
    });
    Suser.save();
    superUser.find()
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