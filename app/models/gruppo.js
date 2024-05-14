const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    founder: {
        type: String,
        required: true
    },
    participants: {
        type: [String],
        default: []
    }
});

const group = mongoose.model('group', groupSchema);

module.exports = group;