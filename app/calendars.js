const express = require('express');
const router = express.Router();
const Calendar = require('./models/calendar.js');
const User = require


router.post('/subscribe', async (req, res) => {
    try {
        
        let userId = req.loggedUser.userId;
        let prevCalendar = await User.findById(userId).subscribedCalendar;
        
        //rimuove l'utente dal calendario a cui era precedentemente iscritto se esiste
        if (prevCalendar) {Calendar.findByIdAndUpdate(prevCalendar, {$pull : {users: userId}}, {new: true}, (err, calendar) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'removed '+ userId + ' from calendar ' + prevCalendar });
            }
        }).exec();}

        //aggiunge il calendario all' utente
        await User.findByIdAndUpdate(userId, {subscribedCalendar: req.body.calendarId}, {new: true}, (err, user) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'User subscribed to calendar ' + req.body.calendarId });
            }
        }).exec();

        //aggiunge l'utente al nuovo calendario
        Calendar.findByIdAndUpdate(req.body.calendarId, {$addtoset : {users: userId}}, {new: true}, (err, calendar) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'added' + userId + ' to calendar ' + req.body.calendarId});
            }
        });

      } catch (err) {
        res.status(500).json({ message: err.message });}
});

router.post('/unsubscribe', async (req, res) => {
    try {
        let userId = req.loggedUser.userId;
        //rimuove il calendario all' utente
        await User.findByIdAndUpdate(userId, {subscribedCalendar: null}, {new: true}, (err, user) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'User unsubscribed from calendar ' + req.body.calendarId });
            }
        }).exec();
        //rimuove l'utente dal calendario
        await Calendar.findByIdAndUpdate(req.body.calendarId, {$pull : {users: userId}}, {new: true}, (err, calendar) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.status(200).json({ message: 'Calendar ' + req.body.calendarId + ' unsubscribed from user ' + userId });
            }
        }).exec();

      } catch (err) {
        res.status(500).json({ message: err.message });}
});



module.exports = router;