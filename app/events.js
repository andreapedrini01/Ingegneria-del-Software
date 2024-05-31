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


  /**
 * @swagger
 * /get-events:
 *   get:
 *     summary: Ottieni eventi associati all'utente autenticato
 *     description: Ritorna una lista di eventi a cui l'utente autenticato è iscritto.
 *     tags:
 *       - Eventi
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista degli eventi dell'utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID dell'evento
 *                   title:
 *                     type: string
 *                     description: Titolo dell'evento
 *                   description:
 *                     type: string
 *                     description: Descrizione dell'evento
 *                   start:
 *                     type: string
 *                     format: date-time
 *                     description: Data e ora di inizio dell'evento
 *                   end:
 *                     type: string
 *                     format: date-time
 *                     description: Data e ora di fine dell'evento
 *       401:
 *         description: Non autorizzato. Token non valido o mancante.
 *       500:
 *         description: Errore interno del server.
 */
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
