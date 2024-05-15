const express = require('express');
const router = express.Router();
const User = require('./models/registeredUser'); // get our mongoose model
const { walk } = require('vue/compiler-sfc');

router.get('/me', async (req, res) => {
    if(!req.loggedUser) {
        return;
    }

    // https://mongoosejs.com/docs/api.html#model_Model.find
    let user = await User.findOne({email: req.loggedUser.email});

    res.status(200).json({
        self: '/app/users/' + user.id,
        email: user.email
    });
});

router.get('', async (req, res) => {
    let users;

    if (req.query.email)
        // https://mongoosejs.com/docs/api.html#model_Model.find
        users = await User.find({email: req.query.email}).exec();
    else
        users = await User.find().exec();

    users = users.map( (entry) => {
        return {
            self: '/app/users/' + entry.id,
            email: entry.email
        }
    });

    res.status(200).json(students);
});

router.post('/register', async (req, res) => {
    try{
        let user = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });

        if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
            res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
            return;
        }

        const existingUser = await User.findOne({ email: user.email });
        //console.log('Existing user:', existingUser);
        if (existingUser) {
            res.status(409).json({ error: 'The email is already in use' });
            console.log('User with the same email already exists');
            return;
        }
        console.log('Started waiting for save');
        user = await user.save();
        console.log('User saved:', user);
        
        let userId = user.id;

        /**
         * Link to the newly created resource is returned in the Location header
         * https://www.restapitutorial.com/lessons/httpmethods.html
         */
        res.location("/app/users/" + userId).status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send();
    }
});

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function checkIfEmailInString(text) {
    // eslint-disable-next-line
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
}


module.exports = router;
