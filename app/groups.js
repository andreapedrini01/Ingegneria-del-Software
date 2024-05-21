const express = require('express');
const router = express.Router();
const User = require('./models/registeredUser'); // get our mongoose model for registered users
const Group = require('./models/gruppo'); // get our mongoose model for groups
const { walk } = require('vue/compiler-sfc');
const group = require('./models/gruppo');



router.post('/newgroup', async (req, res) => {
    try{
        let user = req.body.loggedUser;

        group = new Group({
            founder: user,
            participants: [user]
        });
        try{
            group = await group.save();
            console.log('Group saved:', group);
        } catch (error) {
            console.error('Error saving group:', error);
            res.status(500).send();
        }

    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send();
    }
});


router.post('/addparticipant', async (req, res) => {
    try {
        const groupId = req.body.groupId;
        const userId = req.body.userId;

        const group = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { participants: userId } },
            { new: true }
        );

        if (!group) {
            return res.status(404).send('Group not found');
        }

        res.send(group);
    } catch (error) {
        console.error('Error adding participant:', error);
        res.status(500).send();
    }
});


