const mongoose = require('mongoose');
const User = require('./registeredUser');

const groupSchema = new mongoose.Schema({
    founder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const group = mongoose.model('group', groupSchema);

module.exports = group;