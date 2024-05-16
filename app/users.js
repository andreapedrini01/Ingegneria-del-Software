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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users. If an email is provided as a query parameter, retrieve the user with that email.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *         description: The email of the user to retrieve.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   self:
 *                     type: string
 *                     description: The URL of the user.
 *                   email:
 *                     type: string
 *                     description: The email of the user.
 */
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

    res.status(200).json(users);
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing an email, password, and username.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               username:
 *                 type: string
 *                 description: The user's username.
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: The field "email" must be a non-empty string, in email format.
 *       409:
 *         description: The email is already in use.
 *       500:
 *         description: Error saving user.
 */
router.post('/register', async (req, res) => {
    try{
        let user = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });

        try {
            if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
                res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
                console.log('The field "email" must be a non-empty string, in email format');
                return;
            }
        } catch(error){
            console.log(error);
        }
        
        const existingUser = await User.findOne({ email: user.email });
        
        if (existingUser) {
            res.status(409).json({ error: 'The email is already in use' });
            //console.log('User with the same email already exists');
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
