const express = require('express');
const router = express.Router();
const Calendar = require('./models/calendar.js');
const User = require('./models/registeredUser.js');
/*
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

        //aggiunge il calendario all' utente
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
});*/

router.post('/subscribe', async (req, res) => {
    let userId = req.loggedUser.id;

    try {
        // Remove the user from the calendar they were previously subscribed to, if it exists
        let prevCalendar = (await User.findById(userId, 'subscribedCalendar')).subscribedCalendar;
        if (prevCalendar) {
            await Calendar.findByIdAndUpdate(prevCalendar, {$pull : {users: userId}}, {new: true}).exec();
            console.log('User removed from calendar ' + prevCalendar);
        }

        let newCalendarId = req.body.calendarId;
        if (!newCalendarId) {
            throw new Error('Missing calendarId in request body');
        }
        // Add the calendar to the user
        await User.findByIdAndUpdate(userId, {subscribedCalendar: req.body.calendarId}, {new: true}).exec();

        // Add the user to the new calendar
        await Calendar.findByIdAndUpdate(req.body.calendarId, {$push : {users: userId}}, {new: true}).exec();

        res.status(200).json({ message: userId + ' subscribed to calendar ' + req.body.calendarId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/unsubscribe', async (req, res) => {
    try {
        let userId = req.loggedUser.id;
        let utemp = await User.findById(userId).exec();
        let prevCalendar = utemp.subscribedCalendar;

        if(prevCalendar){
         //rimuove l'utente dal calendario
        await Calendar.findByIdAndUpdate(prevCalendar, {$pull : {users: userId}}, {new: true}).exec();
        //rimuove il calendario all' utente
        await User.findByIdAndUpdate(userId, {subscribedCalendar: null}, {new: true},).exec();
     
        res.status(200).json({ message: 'User unsubscribed successfully'});
        }
        else{
            res.status(404).json({ message: 'User not subscribed to any calendar'});
        }
      } catch (err) {
        res.status(500).json({ message: err.message });}
});



module.exports = router;