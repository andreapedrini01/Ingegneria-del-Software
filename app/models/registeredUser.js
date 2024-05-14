const mongoose = require('mongoose');

const RegisteredUserSchema = new mongoose.Schema({
    username:String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    subscribedGroups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
});

const RegisteredUser = mongoose.model('RegisteredUser', RegisteredUserSchema);

module.exports = RegisteredUser;