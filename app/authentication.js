const express = require('express');
const router = express.Router();
const RegisteredUser = require('./models/registeredUser'); // get our mongoose model
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

router.post('', async function(req, res) {
    let user = await RegisteredUser.findOne({ email: req.body.email }).exec()
    if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
        console.log('User not found');
        return
    }
    if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        return
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
    console.log('Token created for user ' + user.username);
});

module.exports = router;
