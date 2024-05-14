const mongoose = require('mongoose');

const verifiedUserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    partita_iva: {
        type: String,
        required: true
    },
    stabilimenti: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stabilimento'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const VerifiedUser = mongoose.model('VerifiedUser', verifiedUserSchema);

module.exports = VerifiedUser;