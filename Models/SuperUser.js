const mongoose = require('mongoose');

const superUserSchema = new mongoose.Schema({

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }


});
const superUser = mongoose.model('superUser', superUserSchema);
module.exports = superUser;
