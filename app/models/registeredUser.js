const mongoose = require('mongoose');
const { bcrypt_salt } = require('../../config');
const bcrypt = require("bcrypt");

const registeredUserSchema = new mongoose.Schema({
    username:String,
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscribedGroups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    }]
},
{
    timestamps: true,
  }
);

registeredUserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, Number(bcrypt_salt));
    this.password = hash;
    next();
  });

const registeredUser = mongoose.model('registeredUser', registeredUserSchema);

module.exports = registeredUser;
