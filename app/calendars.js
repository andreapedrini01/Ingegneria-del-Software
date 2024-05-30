const express = require('express');
const router = express.Router();
const Calendar = require('./models/calendar.js');
const User = require('./models/registeredUser.js');

/*
router.post('/subscribe', async (req, res) => {
    try {
        
        let userId = req.loggedUser.id;
        let prevCalendar = await User.findById(userId).subscribedCalendar;
        console.log(userId)
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
});



router.post('/unsubscribe', async (req, res) => {
    try {
        let userId = req.loggedUser.id;
        let prevCalendar = await User.findById(userId, 'subscribedCalendar').exec();
        if(prevCalendar){
         //rimuove l'utente dal calendario
        await Calendar.findByIdAndUpdate(prevCalendar, {$pull : {users: userId}}, {new: true}).exec();
        //rimuove il calendario all' utente
        await User.findByIdAndUpdate(userId, {subscribedCalendar: null}, {new: true},).exec();
     
        res.status(200).json({ message: 'User unsubscribed to successfully'});
        }
        else{
            res.status(404).json({ message: 'User not subscribed to any calendar'});
        }
      } catch (err) {
        res.status(500).json({ message: err.message });}
});



module.exports = router;