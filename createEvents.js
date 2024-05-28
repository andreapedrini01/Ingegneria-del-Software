const mongoose = require('mongoose');
const { dburl } = require('./config');
const Event = require('./app/models/event');

mongoose.connect(dburl)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

new Event({title: 'Organico', endTime: '06.00', recurrenceDays: ['martedì', 'venerdì'], zone: 'ravinaromagnano'}).save();
new Event({title: 'Carta', endTime: '13.00', recurrenceDays: ['mercoledì'], zone: 'ravinaromagnano'}).save();
new Event({title: 'Imballaggi leggeri', endTime: '06.00', recurrenceDays: ['venerdì'], zone: 'ravinaromagnano'}).save();
new Event({title: 'Residuo', endTime: '13.00', recurrenceDays: ['mercoledì'], zone: 'ravinaromagnano'}).save();
new Event({title: 'Vetro', endTime: '06.00', recurrenceDays: ['venerdì'], zone: 'ravinaromagnano'}).save();
