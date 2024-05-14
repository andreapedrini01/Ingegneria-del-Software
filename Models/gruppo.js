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

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;