const express = require('express');
const router = express.Router();
const registeredUser = require('./models/registeredUser'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const jwt = require('jsonwebtoken');

router.post('', async function(req, res) {
    let user = await registeredUser.findOne({ email: req.body.email }).exec()
    if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
    }
    if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    }

    //user authenticated -> create a token
    var payload = {
        email: user.email,
        id: user._id,
        //other_data: encrypted_in_the_token
    }
    var options = {
        expiresIn: 86400 // expires in 24 hours
    }
    var token = jwt.sign(payload,
        process.env.SUPER_SECRET,
        options
    );

    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token,
        email: user.email,
        id: user._id,
        self: '/api/v1/' + user._id
    });
});

module.exports = router;
