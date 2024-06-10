const express = require('express');
const router = express.Router();
const Calendar = require('./models/calendar.js');
const User = require('./models/registeredUser.js');

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe a user to a calendar
 *     description: Subscribe the logged-in user to a specified calendar. If the user is already subscribed to another calendar, they will be unsubscribed from the previous one.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calendarId:
 *                 type: string
 *                 description: The ID of the calendar to subscribe to.
 *                 example: 6655d55aa16f88a94fc2e1b4
 *     responses:
 *       200:
 *         description: User subscribed to calendar successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User subscribed to calendar 6655d55aa16f88a94fc2e1b4
 *       404:
 *         description: User not subscribed to any calendar
 *       500:
 *         description: Error subscribing user to calendar
 */
router.post('/subscribe', async (req, res) => {
    try {
        let userId = req.loggedUser.id;
        let prevCalendar = (await User.findById(userId, 'subscribedCalendar')).subscribedCalendar;
        console.log(userId)

        //rimuove l'utente dal calendario a cui era precedentemente iscritto se esiste
        if (prevCalendar) {
            try {
                let calendar = await Calendar.findByIdAndUpdate(prevCalendar, {$pull : {users: userId}}, {new: true}).exec();
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        }

        //aggiunge il calendario all'utente
        try {
            let user = await User.findByIdAndUpdate(userId, {subscribedCalendar: req.body.calendarId}, {new: true}).exec();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

        //aggiunge l'utente al nuovo calendario
        try {
            let calendar = await Calendar.findByIdAndUpdate(req.body.calendarId, {$addToSet : {users: userId}}, {new: true}).exec();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

        res.status(200).json({ message: 'User subscribed to calendar ' + req.body.calendarId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /unsubscribe:
 *   post:
 *     summary: Unsubscribe a user from their current calendar
 *     description: Unsubscribe the logged-in user from their currently subscribed calendar.
 *     responses:
 *       200:
 *         description: User unsubscribed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User unsubscribed successfully
 *       404:
 *         description: User not subscribed to any calendar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not subscribed to any calendar
 *       500:
 *         description: Error unsubscribing user from calendar
 */
router.post('/unsubscribe', async (req, res) => {
    try {
        let userId = req.loggedUser.id;
        let utemp = await User.findById(userId).exec();
        let prevCalendar = utemp.subscribedCalendar;

        if (prevCalendar) {
            //rimuove l'utente dal calendario
            await Calendar.findByIdAndUpdate(prevCalendar, {$pull : {users: userId}}, {new: true}).exec();
            //rimuove il calendario all'utente
            await User.findByIdAndUpdate(userId, {subscribedCalendar: null}, {new: true}).exec();

            res.status(200).json({ message: 'User unsubscribed successfully' });
        } else {
            res.status(404).json({ message: 'User not subscribed to any calendar' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
