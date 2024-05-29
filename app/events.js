const express = require('express');
const router = express.Router();
const tokenChecker = require('./tokenChecker.js');
const User = require('./models/registeredUser');
const Calendar = require('./models/calendar');
const Event = require('./models/event');

const getEventsForUser = async (userId) => {
    try {
      const user = await User.findById(userId).populate({
        path: 'subscribedCalendar',
        populate: {
          path: 'events',
          model: 'Event'
        }
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const events = user.subscribedCalendar ? user.subscribedCalendar.events : [];
      return events;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  router.get('/get-events', tokenChecker, async (req, res) => {
    const userId = req.loggedUser.id;
    try {
      const events = await getEventsForUser(userId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
