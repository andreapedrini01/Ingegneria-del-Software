const express = require('express');
const router = express.Router();
const User = require('./models/registeredUser'); // get our mongoose model for registered users
const Group = require('./models/gruppo'); // get our mongoose model for groups

/**
 * @swagger
 * TODO: Add swagger documentation
 *
 * /newgroup:
 *   post:
 *     summary: Crea un nuovo gruppo
 *     tags: 
 *       - Gruppi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email dell'utente che sta creando il gruppo
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: Gruppo creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 founder:
 *                   type: string
 *                   description: ID del fondatore del gruppo
 *                   example: 60c72b2f5f1b2c001c8e4b4b
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista degli ID dei partecipanti
 *                   example: ["60c72b2f5f1b2c001c8e4b4b"]
 *       500:
 *         description: Errore durante la creazione del gruppo
 *       501:
 *         description: Errore durante il salvataggio del gruppo
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
 *     summary: Aggiungi un partecipante a un gruppo
 *     tags: 
 *       - Gruppi
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *                 description: L'ID del gruppo a cui aggiungere il partecipante
 *                 example: 60c72b2f5f1b2c001c8e4b4b
 *               userId:
 *                 type: string
 *                 description: L'ID dell'utente da aggiungere al gruppo
 *                 example: 60c72b2f5f1b2c001c8e4b4b
 *     responses:
 *       200:
 *         description: Partecipante aggiunto con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: L'ID del gruppo
 *                   example: 60c72b2f5f1b2c001c8e4b4b
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Lista degli ID dei partecipanti
 *                   example: ["60c72b2f5f1b2c001c8e4b4b", "60d72b2f5f1b2c001c8e4b4c"]
 *       404:
 *         description: Gruppo non trovato
 *       500:
 *         description: Errore durante l'aggiunta del partecipante
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
        
    } catch (error) {
        console.error('Error setting group:', error);
        res.status(500).send();
    }
});

router.get('/getgroups', async (req, res) => {
    try {
        const groups = await Group.find({ participants: req.loggedUser.id });
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error getting group:', error);
        res.status(500).send();
    }
});

module.exports = router;