const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
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
        ref: 'group'
    }]
});

const registeredUser = mongoose.model('registeredUser', registeredUserSchema);

module.exports = registeredUser;
