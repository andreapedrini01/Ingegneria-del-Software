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
        ref: 'stabilimento'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const verifiedUser = mongoose.model('verifiedUser', verifiedUserSchema);

module.exports = verifiedUser;
//end