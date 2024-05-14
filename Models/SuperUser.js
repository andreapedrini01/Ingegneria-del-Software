const mongoose = require('mongoose');

const SuperUserSchema = new mongoose.Schema({

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
const SuperUser = mongoose.model('SuperUser', SuperUserSchema);
module.exports = SuperUser;