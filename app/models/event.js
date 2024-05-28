const mongoose = require('mongoose');

// Definizione dello schema per gli eventi
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: String, // Conserva solo l'orario, ad esempio "08:00"
        required: true
    },
    endTime: {
        type: String, // Conserva solo l'orario, ad esempio "09:00"
        required: true
    },
    recurrenceDays: {
        type: [String],
        enum: ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'],
        required: true
    }
}, {
    timestamps: true
});

// Compilazione del modello
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
