const mongoose = require('mongoose');
const { dburl } = require('./config');
const Calendar = require('./app/models/calendar');
const Event = require('./app/models/event');

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
    
    // Trova gli eventi con la zona specificata e seleziona solo gli ID
    Event.find({ zone: 'ravinaromagnano' }, '_id')
    .then(events => {
        // Estrai solo gli ID degli eventi
        const eventIds = events.map(event => event._id);
        
        // Crea e salva un nuovo documento Calendar con gli ID degli eventi
        new Calendar({ events: eventIds, name: 'Ravina-Romagnano' }).save()
        .then(() => {
            console.log('Calendar created and saved successfully');
            mongoose.connection.close();
        })
        .catch(error => {
            console.error('Error saving Calendar:', error);
            mongoose.connection.close();
        });
    })
    .catch(error => {
        console.error('Error finding events:', error);
        mongoose.connection.close();
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});