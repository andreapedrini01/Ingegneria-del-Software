const express = require('express');
const router = express.Router();
const User = require('./models/registeredUser'); // get our mongoose model for registered users
const Group = require('./models/gruppo'); // get our mongoose model for groups

/**
 * @swagger
 * /newgroup:
 *   post:
 *     summary: Create a new group
 *     description: Create a new group with the provided user as the founder and participant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user creating the group.
 *             example:
 *               email: john@example.com
 *     responses:
 *       200:
 *         description: The created group object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Error saving the group.
 */
router.post('/newgroup', async (req, res) => {
    try{
        console.log('Request body:', req.body.email);
        let user = await User.findOne({email: req.body.email});
        group = new Group({
            founder: user._id,
            participants: [user._id]
        });
        console.log('\n\n\n\n\Group created:', group);

        try{
            group = await group.save();
            console.log('\nGroup saved:', group);
        } catch (error) {
            console.error('Error saving group:', error);
            res.status(501).send();
        }

    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /addparticipant:
 *   post:
 *     summary: Add a participant to a group
 *     description: Add a participant to an existing group.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: The ID of the group.
 *               userId:
 *                 type: string
 *                 description: The ID of the user to add as a participant.
 *             example:
 *               groupId: 1234567890
 *               userId: abcdefghij
 *     responses:
 *       200:
 *         description: The updated group object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found.
 *       500:
 *         description: Internal server error.
 */

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


module.exports = router;