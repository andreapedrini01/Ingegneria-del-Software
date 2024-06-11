const express = require('express');
const router = express.Router();
const User = require('./models/registeredUser'); 
const Group = require('./models/gruppo'); 

/**
 * @swagger
 * /newgroup:
 *   post:
 *     summary: Create a new group
 *     description: Create a new group with the logged-in user as the founder.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: The name of the group.
 *                 example: gruppo example
 *     responses:
 *       200:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   properties:
 *                     $oid:
 *                       type: string
 *                       example: 6663016f8924d5ec730aae59
 *                 nome:
 *                   type: string
 *                   example: gruppo example
 *                 founder:
 *                   type: object
 *                   properties:
 *                     $oid:
 *                       type: string
 *                       example: 66571405ef5c8c00f380591b
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         example: 66571405ef5c8c00f380591b
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-07T12:47:43.493Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-07T12:47:43.493Z
 *                 __v:
 *                   type: number
 *                   example: 0
 *       500:
 *         description: Error creating group
 *       501:
 *         description: Error saving group
 */
router.post('/newgroup', async (req, res) => {
    try{
        user = req.loggedUser.id;
        group = new Group({
            nome: req.body.nome,
            founder: user,
            participants: [user]
        });
        console.log('\n\n\n\nGroup created:', group);

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
 *     description: Add a user to the participants list of a group.
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
 *                 example: 6663016f8924d5ec730aae59
 *               email:
 *                 type: string
 *                 description: The email of the user to add.
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: Participant added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   properties:
 *                     $oid:
 *                       type: string
 *                       example: 6663016f8924d5ec730aae59
 *                 nome:
 *                   type: string
 *                   example: gruppo example
 *                 founder:
 *                   type: object
 *                   properties:
 *                     $oid:
 *                       type: string
 *                       example: 66571405ef5c8c00f380591b
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         example: 665716ad8ec88ce94acdf255
 *       404:
 *         description: Group not found
 *       500:
 *         description: Error adding participant
 */
router.post('/addparticipant', async (req, res) => {
    try {
        const groupId = req.body.groupId;
        const email = req.body.email;
        let userId = await User.findOne({email : email}).exec();
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

/**
 * @swagger
 * /removeparticipant:
 *   post:
 *     summary: Remove a participant from a group
 *     description: Remove a user from the participants list of a group.
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
 *                 example: 6663016f8924d5ec730aae59
 *               userId:
 *                 type: string
 *                 description: The ID of the user to remove.
 *                 example: 66560401fa668847d09cca6e
 *     responses:
 *       200:
 *         description: Participant removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "66560401fa668847d09cca6e removed from group 6663016f8924d5ec730aae59"
 *       403:
 *         description: Not authorized to remove participant / Cannot remove yourself
 *       404:
 *         description: Group not found
 *       500:
 *         description: Error removing participant
 */
router.post('/removeparticipant', async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupId).exec();
        const userId = req.body.userId;
        const logged = req.loggedUser.id;

        if (userId === logged) {
            return res.status(403).send('Cannot remove yourself');
        }
        if (!group) {
            return res.status(404).send('Group not found');
        }
        if (group.founder.toString() !== logged) {
            return res.status(403).send('Not authorized');
        }
        Group.findByIdAndUpdate(req.body.groupId, { $pull: { participants: userId } },{new:true}).exec();
        res.status(200).json({message: userId +" removed from group"+req.body.groupId});
    } catch (error) {
        console.error('Error removing participant:', error);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /setgroup:
 *   post:
 *     summary: Create a new group with specified participants
 *     description: Create a new group with the logged-in user as the founder and the specified users as participants.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: The name of the group.
 *                 example: gruppo example
 *               invitati:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The email of the invited users.
 *                   example: ["user1@example.com", "user2@example.com"]
 *     responses:
 *       200:
 *         description: Group created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Group created successfully"
 *       500:
 *         description: Error setting group
 */
router.post('/setgroup', async (req, res) => {
    try {

        let fondatore = req.loggedUser.id;
        let invitati = req.body.invitati;

        const userIds = [];
        for (const email of invitati) {
            let user = await User.findOne({ email:email });
            if (user) {
                userIds.push(user._id);
            }
        }

        const gruppo = new Group({
            nome: req.body.nome,
            founder : fondatore,
            participants: [fondatore, ...userIds]
        });

        await gruppo.save();
        console.log('\n\n\n\nGroup created:', gruppo);
        
        res.status(200).json({ message: 'Group created successfully' });
        
    } catch (error) {
        console.error('Error setting group:', error);
        res.status(500).send();
    }
});
/**
 * @swagger
 * /getgroups:
 *   post:
 *     summary: Get groups of the logged-in user
 *     description: Retrieve all groups that the logged-in user is a participant of.
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         example: 6663016f8924d5ec730aae59
 *                   nome:
 *                     type: string
 *                     example: gruppo example
 *                   founder:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         example: 66571405ef5c8c00f380591b
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         $oid:
 *                           type: string
 *                           example: 66560401fa668847d09cca6e
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-06-07T12:47:43.493Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-06-07T12:47:43.493Z
 *                   __v:
 *                     type: number
 *                     example: 0
 *       500:
 *         description: Error getting groups
 */
router.post('/getgroups', async (req, res) => {
    try {
        const groups = await Group.find({ participants: req.loggedUser.id });
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error getting groups:', error);
        res.status(500).send();
    }
});

/**
 * @swagger
 * /getgroup:
 *   post:
 *     summary: Get a specific group
 *     description: Retrieve details of a specific group by its ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: The ID of the group to retrieve.
 *                 example: 6663016f8924d5ec730aae59
 *     responses:
 *       200:
 *         description: Group details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: object
 *                   properties:
 *                     $oid:
 *                       type: string
 *                       example: 6663016f8924d5ec730aae59
 *                 nome:
 *                   type: string
 *                   example: gruppo example
 *                 founder:
 *                   type: object
 *                   properties:
 *                     $oid:
 *                       type: string
 *                       example: 66571405ef5c8c00f380591b
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         example: 66560401fa668847d09cca6e
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-07T12:47:43.493Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-07T12:47:43.493Z
 *                 __v:
 *                   type: number
 *                   example: 0
 *       500:
 *         description: Error getting group
 */
router.post('/getgroup', async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupId);
        res.status(200).json(group);
    } catch (error) {
        console.error('Error getting group:', error);
        res.status(500).send();
    }
});

module.exports = router;