const mongoose = require('mognoose');
const Event = require("./event");
const User = require("./registeredUser");

const calendarSchema = new mongoose.Schema({
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Calendar', calendarSchema);
